#!/usr/bin/env node
'use strict';
const os = require('os');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const program = require('commander');

//Utils
const questions = require('./questions');
const runCommands = require('./shellHelper');

const sshConfigFileLocation = path.join(os.homedir(), '.ssh', 'config');

program
  .version('0.0.1')
  .description('Generate and setup ssh keys ')
  .option('-g, --generate', 'generate ssh key')
  .parse(process.argv);

if (program.generate) {
  inquirer.prompt(questions).then(answers => {
    let config = answers;
    config['host'] = `${config.hostingProvider}-${config.username}`;
    config['rsa_filename'] = `${config.hostingProvider}_${config.username}_id_rsa`;
    config['hostName'] = `${config.hostingProvider}.com`;

    generateKeysAndConfig(config);
  });
} else {
  console.log('Invalid flag : use ssh-git --generate to generate ssh key');
}

function generateKeysAndConfig(config) {
  const commands = [
    `ssh-keygen -t rsa -b 4096 -C "${config.email}" -f ${config.rsa_filename}`,
    `eval "$(ssh-agent -s)"`,
    `ssh-add -K ${config.rsa_filename}`,
    `pbcopy < ${config.rsa_filename}.pub`
  ];

  const sshConfig = `
Host ${config.host}
  HostName ${config.hostName}
  User git
  UseKeychain yes
  IdentityFile ~/.ssh/${config.rsa_filename}

`;

  runCommands(commands, (err, _results) => {
    {
      if (err === null) {
        fs.appendFileSync(sshConfigFileLocation, sshConfig);
        console.log(
          `ssh key generated successfully 🎉 \nssh public key is copied to your clipboard. Please add this key by logging into your ${
            config.hostingProvider
          } account and going into account settings`
        );
      } else {
        console.log(`Something went wrong when running command : ${err.cmd} \n ${err}`);
      }
    }
  });
}
