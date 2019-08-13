#!/usr/bin/env node
'use strict';
const os = require('os');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const program = require('commander');
const chalk = require('chalk');
const log = console.log;
const manifest = require('../package.json');

//Utils
const {
  questions,
  getCommands,
  getMessages,
  getConfigFileContents,
  showNextSteps
} = require('./util');
const runCommands = require('./shell');

const sshConfigFileLocation = path.join(os.homedir(), '.ssh', 'config');

if (!(process.platform === 'darwin' || process.platform === 'linux')) {
  log(
    chalk`{red.bold Sorry, ssh-git doesn't currently supports your platform. We're working on it to fix this. :)}`
  );
  return;
}

program
  .version(`${manifest.version}`)
  .description('Generate and setup ssh keys ')
  .option('-g, --generate', 'generate ssh key')
  .parse(process.argv);

if (program.generate) {
  inquirer
    .prompt(questions)
    .then(answers => {
      let config = answers;
      config['host'] = `${config.hostingProvider}.com-${config.username}`;
      config['rsa_filename'] = `${config.hostingProvider}_${config.username}_id_rsa`;
      config['hostName'] = `${config.hostingProvider}.com`;

      generateKeysAndConfig(config);
    })
    .catch(error => {
      console.log('something went wrong', error);
    });
} else {
  log(
    chalk`{red.bold Invalid flag : use {green.bold ssh-git --generate} to generate ssh key}`
  );
}

function generateKeysAndConfig(config) {
  const commands = getCommands(config);
  const messages = getMessages();
  const sshConfig = getConfigFileContents(config);

  runCommands(commands, messages, (err, _results) => {
    {
      if (err === null) {
        log(chalk`{bold > Adding IdentityFile to the ssh config file\n\n}`);
        fs.appendFileSync(sshConfigFileLocation, sshConfig);
        showNextSteps(config);
      } else {
        log(chalk`{red.bold ${err}}`);
      }
    }
  });
}
