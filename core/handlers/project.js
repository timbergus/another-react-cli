const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const child_process = require('child_process');

const { createElement } = require('../files');

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'name:',
    validate: name => {
      if (Boolean(name)) {
        try {
          fs.statSync(`./${ name }`);
          return 'Project already exists';
        } catch (error) {
          return true;
        }
      } else {
        return 'Name is required';
      }
    }
  },
  {
    type: 'input',
    name: 'version',
    message: 'version:',
    default: '0.0.1'
  },
  {
    type: 'input',
    name: 'description',
    message: 'description:'
  },
  {
    type: 'input',
    name: 'author',
    message: 'author:'
  },
  {
    type: 'input',
    name: 'license',
    message: 'license:',
    default: 'MIT'
  },
  {
    type: 'list',
    name: 'private',
    message: 'private:',
    default: 'true',
    choices: ['true', 'false']
  }
];

module.exports.projectHandler = type => new Promise((resolve, reject) => {
  inquirer.prompt(questions)
    .then(options => {

      // First we create the project folder.

      fs.mkdirSync(`./${ options.name }`);

      // Then we create the common files.

      require('../../modules/common/config.json').forEach(file => {
        createElement(options, file, ['modules', 'common', 'templates']);
      });

      // And finally, we create the project's files.

      require(`../../modules/${ type }/config.json`).forEach(file => {
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
