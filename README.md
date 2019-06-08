# ssh-git

Generate and setup ssh keys and config for using multiple different Github/Gitlab/Bitbucket accounts using ssh without sweating over it 😅

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

Basically, this CLI tries to automate this [6 step process](https://help.github.com/en/articles/connecting-to-github-with-ssh) which we always have to follow whenever we need to connect any new Github/Gitlab/Bitbucket account on our machine.
Though to connect multiple different accounts using ssh the process is almost similar to one mentioned in the link but is little bit different and quite tedious

This CLI basically solves the above problem by asking you couple of questions and based on it :

- It helps you generate ssh key
- Adds the generated key info to ssh config file
- Adds the generated key to MacOS keychain so you can use ssh for remote communication with your remote repository without needing passwords ever again.

## How to use

Example:
I'm setting up my new machine and need to setup ssh for all my 3 different accounts on Github, Gitlab and Bitbucket.

Using this package, I can generate it in following steps

```sh
ssh-git --generate
```

You will be then prompted with following questions:

```
#1:
? Select hosting service from below for which you are creating ssh keys?
> github
> gitlab
> bitbucket

Select anyone from the above.

#2:
? What is your username associated with above selected account? <Enter your username >

Enter your username

#3:
? What is your email associated with above selected account ? <Enter your email id>

Enter your email id
?
```

When you answer this questions, you will be prompted for passphrase few times to secure the ssh keys you are generating.

Once all of this is done you should see message in the console saying :

\*
ssh key generated successfully 🎉
ssh public key is copied to your clipboard. Please add this key by logging into your Github/Bitbucket/Gitlab account and going into account settings \*

With this, the public key of ssh pair you just generated will be copied to your clipboard. Go to your account settings of Github/Gitlab/Bitbucket and go to section which says SSH/GPG keys and go ahead and add the copied key to it to complete the process.

## License

[MIT](https://github.com/punitda/ssh-git/blob/develop/LICENSE)
