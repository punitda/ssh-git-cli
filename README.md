# ssh-git

Generate and setup ssh keys and config for using multiple different Github/Gitlab/Bitbucket accounts on same machine using ssh without sweating over it 😅

### Note :

It works only in **MacOS** and **Linux**(though not thoroughly tested on Linux. Please file bugs if you find any issues) for now.
Support for windows will be added soon in next releases.

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

It helps you generate and manage ssh keys for using multiple different Github/Gitlab/Bitbucket accounts using ssh on same machine.

This CLI tries to automate this [6 step process](https://help.github.com/en/articles/connecting-to-github-with-ssh) which we always have to follow whenever we need to connect any new Github/Gitlab/Bitbucket account on our machine using ssh.
Though the process to connect multiple different accounts using ssh on same machine is almost similar to one mentioned in the link but it is little bit different and quite tedious

The CLI automates the above process by asking you couple of questions and based on it :

- It helps you generate a ssh key
- Adds the generated key info to ssh config file
- Adds the generated key to MacOS keychain so you can use ssh for remote communication with your remote repository without needing passwords ever again.

## How to use

Example:
I'm setting up my new machine and need to setup ssh for all my 3 different accounts on Github, Gitlab and Bitbucket.

Using this package, I can generate it in following steps.

### Note:

Steps mentioned below are for generating ssh key for single account at a time. You can follow this process any no. of times to connect to multiple different accounts on Github, Gitlab and Bitbucket on same machine.

```sh
ssh-git --generate
```

You will be then prompted with following questions:

```
#1:
? Please select hosting service account from below for which you are generating the ssh keys:
> github
> gitlab
> bitbucket

Select anyone from the above.

#2:
? Please enter your username associated with above selected account for which you are generating ssh keys:

Enter your username

#3:
? Please enter your email id associated with above selected account for which you are generating ssh keys:

Enter your email id

#4:
? For additional protection of the ssh key that would be generated in next step, we need to password protect the key. Please enter strong passphrase to use to protect the key. Note: Remember the passphrase you will enter below because you will be asked to enter the same passphrase in one more step after it

Enter passphrase for ssh key

```

When you answer this questions, your ssh key generation process would start.

After key is generated, it will be added to OSX keychain. For adding it to keychain, you will be prompted for passphrase for the ssh key. This is done so you don't have to remember and input your ssh key passphrase again and again when using it.

Once everything is done. You should see the following output in your console.

```
ssh key and config generated successfully 🎉 and Public key has been copied to your Clipboard.


Few steps you need to follow next to start using this ssh key:

1. Login into your bitbucket account.
2. Go to Account Settings/Developer Settings page.
3. Look for ssh key in settings and add the key which is copied to your clipboard

Once you've added the key to your <bitbucket/github/gitlab.com> account by following the above steps, to start using this key when communicating with repository you need to update your repository's remote url and replace <bitbucket/github/gitlab.com> with <bitbucket/github/gitlab.com-<username>>

```

## License

[MIT](https://github.com/punitda/ssh-git/blob/develop/LICENSE)
