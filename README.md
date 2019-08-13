# ssh-git

Generate SSH keys and config for connecting to Github, Gitlab and Bitbucket accounts using SSH without sweating over your terminal 😅

## How to install and run

```sh
npm install -g ssh-git (Installing globally)
ssh-git --generate (Running it)
```

or

```
npx ssh-git --generate (If you have npm 5.2+)(Recommended)
```

## How it works

This CLI tries to automate this [6 step process](https://help.github.com/en/articles/connecting-to-github-with-ssh) which we always have to follow whenever we need to connect any new Github/Gitlab/Bitbucket account on our machine using SSH. This process involves typing several commands in your terminal in order to generate SSH key pair to be able to connect to your accounts.  
And, trust me it is no fun to setup 😞

This Node CLI automates the above process by asking you couple of questions and based on it :

- It helps you generate a ssh key
- Adds the generated key info to ssh config file
- Adds the generated key to ssh-agent and to MacOS keychain(only on MacOS) so you can use SSH for remote communication with your remote repository without needing passwords ever again. Phew!

## How to use

Open your terminal and type below command.

```sh
ssh-git --generate
```

(_Note:_ Steps mentioned below are for generating ssh key for single account at a time. You can follow this process any no. of times to connect to multiple different accounts on Github, Gitlab and Bitbucket on same machine.)

Once you enter the above command you will be then prompted with following questions. Based on your answers CLI will generate appropriate SSH keypair files:

```
Question #1:
? Please select hosting service account from below for which you are generating the ssh keys:
> github
> gitlab
> bitbucket

[Select anyone from the above.]

Question #2:
? Please enter your username associated with above selected account for which you are generating ssh keys:

[Enter your username]

Question #3:
? Please enter your email id associated with above selected account for which you are generating ssh keys:

[Enter your email id]

Question #4:
? For additional protection of the ssh key that would be generated in next step, we need to password protect the key. Please enter strong passphrase to use to protect the key.
(Note: Remember the passphrase you will enter below because you will be asked to enter the same passphrase in one more step after it)

[Enter passphrase for ssh key]

```

After answering above questions, the ssh key generation process would start with info you've provided in the answers.

After key is generated, it will be added to ssh-agent and OSX keychain(only in MacOS). For adding it to keychain or ssh-agent, you will be prompted for passphrase for the ssh key. This is done so you don't have to remember and input your ssh key passphrase again and again when using it.

Once everything is done. You should see the following output in your console. Just follow few steps suggested in output to start using those generated ssh key keys to communicate with our repo :)

```
ssh key and config generated successfully 🎉 and public key has been copied to your Clipboard.


Few steps you need to follow next to start using this ssh key:

1. Login into your <bitbucket/github/gitlab> account.
2. Go to Account Settings/Developer Settings page.
3. Look for ssh key in settings and add the key which is copied to your clipboard

Once you've added the key to your <bitbucket/github/gitlab.com> account by following the above steps, to start using this key when communicating with repository you need to update your repository's remote url and replace <bitbucket/github/gitlab.com> with <bitbucket/github/gitlab.com-<username>>

```

## License

[MIT](https://github.com/punitda/ssh-git/blob/develop/LICENSE)
