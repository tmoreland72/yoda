#!/usr/bin/env node

const program = require('commander')

const createProject = require('../lib/create-project')
const destroyProject = require('../lib/destroy-project')

/**
 * Create a new project
 */
program
   .command('create')
   .description('Create a new project')
   .action(function () {
      createProject()
   })

/**
 * Recursively deletes a project
 */
program
   .command('destroy')
   .description('Recursively deletes a project')
   .action(function () {
      destroyProject()
   })

program.parse(process.argv)
