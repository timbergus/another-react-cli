#!/usr/bin/env node

const chalk = require('chalk');
const inquirer = require('inquirer');

const { checkArgs } = require('./core/actions');

const indexForm = require('./core/forms/index.form');

inquirer.prompt(indexForm)
  .then(options => {
    checkArgs(options.command).then(
      response => console.log(chalk.cyan(response)),
      error => console.log(chalk.red(error))
    );
  });
