const os = require('os');
const path = require('path');
const exec = require('child_process').exec;
const chalk = require('chalk');

const sshDir = path.join(os.homedir(), '.ssh');

const execute = (command, message, cb) => {
  console.log(chalk`{bold ${message}}`);
  let childProcess = exec(command, {
    cwd: `${sshDir}`,
    shell: '/bin/zsh'
  });

  childProcess.on('exit', function(code) {
    let err = null;
    if (code) {
      err = new Error(`command : ${command} exited with wrong status code ${code}`);
      err.code = code;
      err.cmd = command;
    }
    if (cb) cb(err);
  });

  childProcess.stdout.on('data', data => {
    console.log(`${data}`);
  });
};

const runCommands = function(commands, messages, cb) {
  let execNext = function() {
    execute(commands.shift(), messages.shift(), function(err) {
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
