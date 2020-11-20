const fs = require('fs')
const chalk = require('chalk')
const inquirer = require('inquirer')
const spawn = require('cross-spawn')

const quote = require('./quotes')

let auth0Domain, auth0Audience, fbProject, localIpAddress

async function runFirebaseCreate(project) {
   try {
      console.log('Installing Firebase & GitHub CLI tools...')
      spawn.sync('npm', ['i', '-g', 'firebase-tools', 'gh'])
      fs.mkdirSync(`./${project}/server`, function (err, data) {
         if (err) throw err
      })

      console.log('Logging into Firebase...')
      spawn.sync('firebase', ['login'], {
         stdio: 'inherit',
      })

      console.log('Cloning repo from GitHub...')
      spawn.sync('gh', ['repo', 'clone', 'https://github.com/34fame/server-firebase-template', 'server'], {
         cwd: `./${project}`,
         stdio: 'inherit',
      })

      const questions = [
         {
            message: 'What is your computers local IP address?',
            name: 'ipAddress',
            type: 'input',
            default: '192.168.0.2',
         },
         {
            message: 'What is your Auth0 domain? (See README for details)',
            name: 'auth0Domain',
            type: 'input',
            default: 'foo.us.auth0.com',
         },
         {
            message: 'What is your Auth0 API Audience? (See README for details)',
            name: 'auth0Audience',
            type: 'input',
            default: 'http://api.foo.com',
         },
      ]
      await inquirer.prompt(questions).then((answers) => {
         auth0Audience = answers.auth0Audience
         auth0Domain = answers.auth0Domain
         localIpAddress = answers.ipAddress

         const basePath = `./${project}/server`

         let file = `${basePath}/firebase.json`
         fs.readFile(file, 'utf-8', function (err, data) {
            if (err) throw err
            let updates = data
            updates = updates.replace(/%local-ip-address%/g, localIpAddress)
            fs.writeFile(file, updates, 'utf-8', function (err, data) {
               if (err) throw err
            })
         })

         file = `${basePath}/functions/.env`
         contents = `
         AUTH0_AUDIENCE=${auth0Audience}
         AUTH0_DOMAIN=${auth0Domain}
         `
         fs.writeFile(file, contents, 'utf-8', function (err, data) {
            if (err) throw err
         })

         console.log('Initializing Cloud Functions...')
         console.log(
            chalk.bold.hex('#F39C12')(
               '  INFO: I suggest you select a development Firebase project.  Later you can create additional environments (e.g. Staging, Production, etc.).'
            )
         )
         spawn.sync('firebase', ['use', '--add'], {
            cwd: `./${project}/server`,
            stdio: 'inherit',
         })

         console.log(chalk.bold.red('  !!! ALERT  !!!'))
         console.log(chalk.bold.red('  Do NOT overwrite any files!!'))
         console.log(chalk.bold.red('  Do NOT update with NPM!!!'))
         spawn.sync('firebase', ['init', 'functions'], {
            cwd: `./${project}/server`,
            stdio: 'inherit',
         })

         console.log('Initializing Firebase Emulators...')
         console.log(chalk.bold.red('  ALERT: Keep defaults for all questions!'))
         spawn.sync('firebase', ['init', 'emulators'], {
            cwd: `./${project}/server`,
            stdio: 'inherit',
         })

         console.log('Installing packages...')
         spawn.sync('yarn', [], {
            cwd: `./${project}/server/functions`,
            stdio: 'inherit',
         })
      })
   } catch (err) {
      console.error('Oops!  Problems with creating Firebase server...', err)
   }
}

module.exports = async function (project) {
   quote('other', "I'm one with the Force.  The Force is with me.")
   console.log('Installing Firebase Cloud Functions server...')

   await runFirebaseCreate(project)

   console.log('')
   console.log('Ok.  The Server is pretty much ready.')
   console.log(chalk.bold.hex('#F39C12')('You need to download the Server Account json file from your'))
   console.log(chalk.bold.hex('#F39C12')('Firebase project and save it as:'))
   console.log('  ./server/functions/services/firebase/service-account.json')
   console.log('')
}
