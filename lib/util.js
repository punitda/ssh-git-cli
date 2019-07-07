const chalk = require('chalk');
const log = console.log;

const questions = [
  {
    type: 'list',
    name: 'hostingProvider',
    message:
      'Please select hosting service account from below for which you are generating the ssh keys: ',
    choices: ['github', 'gitlab', 'bitbucket']
  },
  {
    name: 'username',
    message:
      'Please enter your username associated with above selected account for which you are generating ssh keys:'
  },
  {
    name: 'email',
    message:
      'Please enter your email id associated with above selected account for which you are generating ssh keys: '
  },
  {
    name: 'passphrase',
    message:
      'For additional protection of the ssh key that would be generated in next step, we need to password protect the key. Please enter strong passphrase which will be used to protect the key.\nNote: Please remember the passphrase which you will enter below because you will be asked to enter the same passphrase again in one more step after it',
    type: 'password'
  }
];

const getCommands = config => {
  if (process.platform === 'darwin') {
    return [
      `ssh-keygen -t rsa -b 4096 -C "${config.email}" -f ${config.rsa_filename} -P ${
        config.passphrase
      }`,
      `eval "$(ssh-agent -s)"`,
      `ssh-add -K ${config.rsa_filename}`,
      `pbcopy < ${config.rsa_filename}.pub`
    ];
  } else {
    [
      `ssh-keygen -t rsa -b 4096 -C "${config.email}" -f ${config.rsa_filename} -P ${
        config.passphrase
      }`,
      `eval "$(ssh-agent -s)"`,
      `ssh-add ${config.rsa_filename}`,
      `cat ${config.rsa_filename}.pub`
    ];
  }
};

const getMessages = () => {
  if (process.platform === 'darwin') {
    return [
      `> Generating ssh keys...`,
      `> Starting ssh-agent...`,
      `> Adding generated ssh keys to the OSX Keychain so that you don't have to remember passphrase of ssh keys when using them.\nPlease enter the passphrase you just entered in the previous step to add it to keychain`,
      `> Copying the public key to the Clipboard...`
    ];
  } else {
    return [
      `> Generating ssh keys...`,
      `> Starting ssh-agent...`,
      `> Adding generated ssh keys to the ssh-agent`,
      `> Outputting public key to the console...`
    ];
  }
};

const getConfigFileContents = config => {
  return `
Host ${config.host}
  HostName ${config.hostName}
  User git
  UseKeychain yes
  IdentityFile ~/.ssh/${config.rsa_filename}
  IgnoreUnknown UseKeychain

`;
};

const showNextSteps = config => {
  if (process.platform === 'darwin') {
    log(
      chalk`{green.bold SSH key and config generated successfully 🎉  and public key has been copied to your Clipboard. \n\n}`
    );
    log(
      chalk`{blue.bold To start using this ssh key, you need to follow below few steps :\n1. Login into your ${
        config.hostingProvider
      } account.\n2. Go to Account Settings/Developer Settings page.\n3. Look for something which says "ssh key" in settings and add the key which is copied to your clipboard.\n}`
    );
  } else {
    log(
      chalk`{green.bold SSH key and config generated successfully 🎉  and public key has been printed to the console. Please copy it to your Clipboard. \n\n}`
    );
    log(
      chalk`{blue.bold To start using this ssh key, you need to follow below few steps :\n1. Login into your ${
        config.hostingProvider
      } account.\n2. Go to Account Settings/Developer Settings page.\n3. Look for something which says "ssh key" in settings and add the key which is printed above.\n}`
    );
  }
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
};

module.exports = {
  questions,
  getCommands,
  getMessages,
  getConfigFileContents,
  showNextSteps
};
