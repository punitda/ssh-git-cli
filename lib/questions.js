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
      'For additional protection of the ssh key that would be generated in next step, we need to password protect the key. Please enter strong passphrase to use to protect the key. Note: Remember the passphrase you will enter below because you will be asked to enter the same passphrase in one more step after it',
    type: 'password'
  }
];

module.exports = questions;
