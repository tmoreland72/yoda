# Yoda

Yoda is a CLI to assist with managing full stack projects (i.e. Client and Server).

You would start by using `yoda create` to create a new project. Just provide it with a name and away we go. You will be asked if you want to create a Client and a Server in the project. Assuming you do and you call your project `super-awesome-project`, you'll end up with a simple structure like so:

```
./super-awesome-project
   L client
   L server
```

In version 0.0.1 things are pretty constrained.

-  You can only create a Client using Quasar Framework
-  You can only create a Server using Firebase Cloud Functions

If you aren't using either of these, feel free to contribute! :smile:

For those of you who are using Quasar and Firebase, you are going to love this!

## Getting Started

Since _Yoda_ is a CLI tool, you need to install it as a global package.

```sh
npm i -g @34fame/yoda
```

Once installed, you can simply type `yoda` and see the basic help.

-  Run `yoda` from a directory that will be the parent to your project directory
-  READ THE DIRECTIONS found throughout the process. If not, you will likely have to wipe what you've done and start over.
-  The current setup assumes you are using Quasar and Firebase as mentioned above. It also assumes you are using Auth0 for user authentication and for authorizing calls between your Client and Server. If you don't want to use this, that's fine, you'll just have to clear out those files after the install.
