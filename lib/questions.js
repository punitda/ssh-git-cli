const questions = [
  {
    type: 'list',
    name: 'hostingProvider',
    message: 'Select hosting service from below for which you are creating ssh keys?',
    choices: ['github', 'gitlab', 'bitbucket']
  },
  {
    name: 'username',
    message: 'What is your username associated with above selected account?'
  },
  {
    name: 'email',
    message: 'What is your email associated with above selected account?'
  }
];

module.exports = questions;
