const os = require('os');
const path = require('path');
const exec = require('child_process').exec;
const chalk = require('chalk');

const sshDir = path.join(os.homedir(), '.ssh');

const execute = (command, shell, message, cb) => {
  console.log(chalk`{bold ${message}}`);
  let childProcess = exec(command, {
    cwd: `${sshDir}`,
    shell
  });

  childProcess.on('exit', code => {
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

const runCommands = (commands, messages, cb) => {
  let execNext = shell => {
    execute(commands.shift(), shell, messages.shift(), err => {
      if (err) {
        cb(err);
      } else {
        if (commands.length) execNext(shell);
        else cb(null);
      }
    });
  };
  exec('echo $SHELL', (_error, stdout, _stderr) => {
    const defaultShell = stdout.trim();
    console.log(chalk`{bold Using default shell: ${defaultShell}}`);
    execNext(defaultShell);
  });
};

module.exports = runCommands;
