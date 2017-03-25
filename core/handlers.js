const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const child_process = require('child_process');

const { createElement } = require('./files');

const projectForm = require('./forms/project.form');
const componentForm = require('./forms/component.form');

module.exports.componentHandler = type => new Promise((resolve, reject) => {
  inquirer.prompt(componentForm)
    .then(options => {

      let newOptions = Object.assign(options, {
        name: options.name.charAt(0).toUpperCase() + options.name.slice(1)
      });

      require(`../modules/${ type }/config.json`).forEach(file => {
        createElement(newOptions, file, ['modules', type, 'templates'], type);
      });

      resolve(`"${ options.name }Component" created!`);
    });
});

module.exports.projectHandler = type => new Promise((resolve, reject) => {
  inquirer.prompt(projectForm)
    .then(options => {

      // First we create the project folder.

      fs.mkdirSync(`./${ options.name }`);

      // Then we create the common files.

      require('../modules/common/config.json').forEach(file => {
        createElement(options, file, ['modules', 'common', 'templates']);
      });

      // And finally, we create the project's files.

      require(`../modules/${ type }/config.json`).forEach(file => {
        createElement(options, file, ['modules', type, 'templates']);
      });

      // Then we launch the command line tasks.

      try {
        child_process.execSync(`cd ./${ options.name } && git init`);
      } catch (error) {
        reject('Cannot create git repository!');
      }

      console.log(chalk.green('Installing dependencies!'));

      try {
        child_process.execSync(`cd ./${ options.name } && yarn install`);
      } catch (error) {
        reject('Cannot install dependencies!');
      }

      resolve(`Project "${ options.name }" created!`);
    })
    .catch(error => {
      reject('Cannot create project!');
    });
});
