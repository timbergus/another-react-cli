#!/usr/bin/env node

const chalk = require('chalk');
const inquirer = require('inquirer');

const { checkArgs } = require('./utils/actions');

const question = [{
  type: 'list',
  name: 'command',
  message: 'What do you want to create?',
  default: 'empty application',
  choices: ['empty application', 'full application', 'component']
}];

inquirer.prompt(question).then(options => {
  checkArgs(options.command).then(
    response => console.log(chalk.cyan(response)),
    error => console.log(chalk.red(error))
  );
});
