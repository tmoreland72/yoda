const fs = require('fs')
const inquirer = require('inquirer')
const spawn = require('cross-spawn')
const chalk = require('chalk')

const quote = require('./quotes')
const createQuasar = require('./client-quasar')
const createFirebase = require('./server-firebase')

function confirmCreateServer(project) {
   const prompt = {
      message: 'Create a Server for this project?',
      name: 'selection',
      type: 'list',
      choices: ['Firebase Cloud Functions', 'Node/Express', 'No'],
      default: 'Firebase Cloud Functions',
   }
   inquirer.prompt(prompt).then((answers) => {
      if (answers.selection === 'Firebase Cloud Functions') {
         createFirebase(project)
      } else {
         quote('vader')
      }
   })
}

async function confirmCreateClient(project) {
   const prompt = {
      message: 'Create a Client for this project?',
      name: 'selection',
      type: 'list',
      choices: ['Quasar', 'No'],
      default: 'Quasar',
   }
   await inquirer.prompt(prompt).then(async (answers) => {
      if (answers.selection === 'Quasar') {
         await createQuasar(project)
      } else {
         quote('vader')
      }
   })
}

async function confirmNewProject() {
   const prompt = {
      message: 'This will create a new project directory in the current path.  What should the project be called?',
      name: 'project',
      type: 'input',
      default: 'my-project',
   }
   await inquirer
      .prompt(prompt)
      .then(async (answers) => {
         try {
            quote('yoda')
            const project = answers.project
            fs.mkdirSync(`./${project}`, function (err, data) {
               if (err) throw err
            })
            await confirmCreateClient(project)
            confirmCreateServer(project)
         } catch (err) {
            console.log('Oops...  Problems right off the bat!', err)
         }
      })
      .catch((err) => {
         console.error('Oops!', err)
      })
}

module.exports = function () {
   quote('yoda', 'Create a new project, you will!')
   console.log('-------------------------------')

   confirmNewProject()
}
