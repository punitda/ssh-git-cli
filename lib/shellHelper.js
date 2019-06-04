const os = require('os');
const path = require('path');
const sshDir = path.join(os.homedir(), '.ssh');

const exec = (command, cb) => {
  let {spawn} = require('child_process');
  let parts = command.split(/\s+/g);
  let childProcess = spawn(parts[0], parts.slice(1), {
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

  childProcess.stderr.on('data', data => {
    console.log(`stdErr: ${data}`);
    cb(data);
  });

  childProcess.stdout.on('data', data => {
    console.log(`stdOut: ${data}`);
  });
};

const series = function(commands, cb) {
  let execNext = function() {
    exec(commands.shift(), function(err) {
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

module.exports = {series};
