#!/usr/bin/env node
'use strict';
const os = require('os');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const program = require('commander');
const chalk = require('chalk');
const log = console.log;
//Utils
const questions = require('./questions');
const runCommands = require('./shellHelper');

const sshConfigFileLocation = path.join(os.homedir(), '.ssh', 'config');

program
  .version('0.0.6')
  .description('Generate and setup ssh keys ')
  .option('-g, --generate', 'generate ssh key')
  .parse(process.argv);

if (program.generate) {
  inquirer.prompt(questions).then(answers => {
    let config = answers;
    config['host'] = `${config.hostingProvider}.com-${config.username}`;
    config['rsa_filename'] = `${config.hostingProvider}_${config.username}_id_rsa`;
    config['hostName'] = `${config.hostingProvider}.com`;

    generateKeysAndConfig(config);
  });
} else {
  log(chalk`{red.bold Invalid flag : use ssh-git --generate to generate ssh key}`);
}

function generateKeysAndConfig(config) {
  const commands = [
    `ssh-keygen -t rsa -b 4096 -C "${config.email}" -f ${config.rsa_filename} -P ${
      config.passphrase
    }`,
    `eval "$(ssh-agent -s)"`,
    `ssh-add -K ${config.rsa_filename}`,
    `pbcopy < ${config.rsa_filename}.pub`
  ];

  const messages = [
    `> Generating ssh keys...`,
    `> Starting ssh-agent...`,
    `> Adding generated ssh keys to the OSX Keychain so that you don't have to remember passphrase of ssh keys when using them. Please enter the passphrase you just entered in the previous step to add it to keychain`,
    `> Copying the public key to the Clipboard...`
  ];

  const sshConfig = `
Host ${config.host}
  HostName ${config.hostName}
  User git
  UseKeychain yes
  IdentityFile ~/.ssh/${config.rsa_filename}

`;

  runCommands(commands, messages, (err, _results) => {
    {
      if (err === null) {
        log(chalk`{bold > Adding IdentityFile to ssh config file\n\n}`);
        fs.appendFileSync(sshConfigFileLocation, sshConfig);
        log(
          chalk`{green.bold ssh key and config generated successfully 🎉  and public key has been copied to your Clipboard. \n\n}`
        );
        log(
          chalk`{blue.bold Few steps you need to follow next to start using this ssh key:\n1. Login into your ${
            config.hostingProvider
          } account.\n2. Go to Account Settings/Developer Settings page.\n3. Look for ssh key in settings and add the key which is copied to your clipboard\n}`
        );
        log(
          chalk.blue.bold("Once you've added the key to your ") +
            chalk.green.bold.underline(`${config.hostingProvider}.com `) +
            chalk.blue.bold(
              "account by following the above steps, to start using this key when communicating with repository you need to update your repository's remote url and replace "
            ) +
            chalk.green.bold.underline(`${config.hostingProvider}.com `) +
            chalk.blue.bold('with ') +
            chalk.green.bold.underline(`${config.host}`)
        );
      } else {
        log(chalk`{red.bold ${err}}`);
      }
    }
  });
}
