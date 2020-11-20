const fs = require('fs')
const inquirer = require('inquirer')
const spawn = require('cross-spawn')
const chalk = require('chalk')

const quote = require('./quotes')

async function addPlugins(project) {
   const prompt = {
      message: 'Select Plugins',
      name: 'selections',
      type: 'checkbox',
      choices: [
         { name: 'Dialog', checked: true },
         { name: 'Loading', checked: true },
         { name: 'LocalStorage', checked: true },
         { name: 'SessionStorage', checked: true },
         { name: 'Notify', checked: true },
      ],
   }

   await inquirer.prompt(prompt).then((answers) => {
      let selections = answers.selections
      let plugins = 'plugins: ['
      selections.map((s) => {
         plugins += `'${s}',`
      })
      plugins += ']'

      const confFile = `./${project}/client/quasar.conf.js`
      fs.readFile(confFile, 'utf-8', function (err, data) {
         if (err) throw err
         let updates = data.replace(/plugins: \[\]/g, plugins)
         fs.writeFile(confFile, updates, 'utf-8', function (err, data) {
            if (err) throw err
         })
      })
      console.log('Power!  Unlimited power!')
   })
}

async function addAppExtensions(project) {
   const prompt = {
      message: 'Select App Extensions',
      name: 'selections',
      type: 'checkbox',
      choices: [
         {
            name: '@quasar/qenv',
            checked: true,
         },
         { name: '@quasar/testing' },
         { name: '@quasar/qmarkdown' },
         { name: '@quasar/qcalendar' },
         { name: '@quasar/qscroller' },
      ],
   }

   await inquirer.prompt(prompt).then(async (answers) => {
      let selections = answers.selections
      selections.map((s) => {
         const child = spawn.sync('quasar', ['ext', 'add', s], {
            cwd: `./${project}/client`,
            stdio: 'inherit',
         })
      })

      await addPlugins(project)
   })
}

async function runQuasarCreate(project) {
   console.log(chalk.red.bold("  ALERT: Leave the Quasar project name as 'client'!!"))
   const child = spawn.sync('quasar', ['create', 'client'], {
      cwd: `./${project}`,
      stdio: 'inherit',
   })

   // Set some default configuration settings
   const confFile = `./${project}/client/quasar.conf.js`
   fs.readFile(confFile, 'utf-8', function (err, data) {
      if (err) throw err
      let updates = data
      updates = updates.replace(/vueRouterMode: 'hash'/g, "vueRouterMode: 'history'")
      updates = updates.replace(/\/\/ 'fontawesome\-v5'/g, "'fontawesome-v5'")
      fs.writeFile(confFile, updates, 'utf-8', function (err, data) {
         if (err) throw err
      })
   })

   await addAppExtensions(project)
}

module.exports = async function (project) {
   console.log('Installing Quasar. You are the chosen one!')
   console.log('-------------------------------')

   await runQuasarCreate(project)

   console.log('')
   console.log('Ok.  The Client is pretty much ready.')
   console.log('')
   quote('han', "You're all clear kid!  Now let's blow this thing and go home!")
}
