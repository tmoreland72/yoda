const chalk = require('chalk')

const log = console.log
const characters = {
   yoda: {
      color: chalk.bold.greenBright,
      default: 'Do.  Or do not.  There is no try.',
   },
   vader: {
      color: chalk.bold.redBright,
      default: 'I find your lack of confidence disturbing!',
   },
   han: {
      color: chalk.bold.hex('#6E2C00'),
      default: 'I know.',
   },
   luke: {
      color: chalk.bold.blueBright,
      default: '',
   },
   other: {
      color: chalk.bold.yellowBright,
      default: '',
   },
}

module.exports = function (character, quote) {
   log('')
   log('    ', characters[character].color(quote ? quote : characters[character].default))
   log('')
}
