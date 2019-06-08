const os = require('os');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

//Utils
const questions = require('./questions');
const runCommands = require('./shellHelper');

const sshConfigFileLocation = path.join(os.homedir(), '.ssh', 'config');

function run() {
  inquirer.prompt(questions).then(answers => {
    let config = answers;
    config['host'] = `${config.hostingProvider}-${config.username}`;
    config['rsa_filename'] = `${config.hostingProvider}_${config.username}_id_rsa`;
    config['hostName'] = `${config.hostingProvider}`;

    generateKeysAndConfig(config);
  });
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
          `ssh public key copied to clipboard. Please add this key by logging into your ${
            config.hostingProvider
          } account and going into account settings`
        );
      } else {
        console.log(`Something went wrong when running command : ${err.cmd} \n ${err}`);
      }
    }
  });
}

run();
