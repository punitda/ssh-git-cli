const os = require('os');
const path = require('path');
const {spawn} = require('child_process');
const chalk = require('chalk');

const sshDir = path.join(os.homedir(), '.ssh');

const execute = (command, message, cb) => {
  console.log(chalk`{bold ${message}}`);
  const child_process = spawn(command, {
    stdio: [process.stdin, 'pipe', 'pipe'],
    cwd: `${sshDir}`,
    shell: true
  });

  child_process.stdout.on('data', data => {
    console.log(`${data}`);
  });

  child_process.once('exit', code => {
    let err = null;
    if (code) {
      if (command.includes('ssh-key'))
        err = new Error(
          'Cool! As instructed, not overwriting existing ssh-key and stopping the ssh-key generation process.'
        );
      else
        err = new Error(
          `Something went wrong when running command : ${command} exited with status code ${code}`
        );
      err.code = code;
      err.cmd = command;
    }
    if (cb) cb(err);
  });

  child_process.once('error', error => {
    if (cb) cb(error);
  });
};

const runCommands = (commands, messages, cb) => {
  let execNext = () => {
    execute(commands.shift(), messages.shift(), err => {
      if (err) {
        cb(err);
      } else {
        if (commands.length) execNext();
        else cb(null);
      }
    });
  };
  execNext();
};

module.exports = runCommands;
