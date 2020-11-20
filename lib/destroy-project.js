const chalk = require('chalk')
const inquirer = require('inquirer')
const spawn = require('cross-spawn')

function runDestroyProject() {
   const prompt = {
      message: 'Project name',
      name: 'name',
      type: 'input',
      default: 'my-quasar-app',
   }

   inquirer.prompt(prompt).then((answers) => {
      let name = answers.name
      const child = spawn.sync('rm', ['-rf', name], { stdio: 'inherit' })
      console.log('Power!  Unlimited power!')
   })
}

function confirmDestroyProject() {
   const prompt = {
      message: 'This will recursively destroy a project of your choosing.  Are you good with that?',
      name: 'confirm',
      type: 'confirm',
      default: true,
   }
   inquirer.prompt(prompt).then((answers) => {
      if (answers.confirm) {
         console.log('Do.  Or do not.  There is no try...')
         runDestroyProject()
      } else {
         console.log('I find your lack of faith disturbing.')
      }
   })
}

module.exports = function () {
   console.log('Destroy a project, you will, hmmm?!')
   console.log('-------------------------------')

   confirmDestroyProject()
}
