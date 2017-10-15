const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const child_process = require('child_process');

const { createElement } = require('./tools');

const forms = {
  front: require('./forms/project.form'),
  component: require('./forms/component.form')
}

module.exports.actionHandler = type => new Promise((resolve, reject) => {
  inquirer.prompt(forms[type])
    .then(options => {

      if (type !== 'component') {

        // First we create the project folder.

        fs.mkdirSync(`./${ options.name }`);

        // Then we create the common files.

        require('../modules/common/config.json').forEach(file => {
          createElement(options, file, ['modules', 'common', 'templates']);
        });
      }

      // And finally, we create the project's files. We need to add only the
      // files that are required. That means:
      //
      // * file.dependency !== false
      // or
      // * options[file.dependency] === true

      require(`../modules/${ type }/config.json`).forEach(file => {
        if (!file.dependency || options[file.dependency]) {
          createElement(options, file, ['modules', type, 'templates'], type);
        }
      });

      // Then we launch the command line tasks if we are not creaating a
      // component.

      if (type === 'component') {
        resolve(`"${ options.name }Component" created!`);
      } else {
        try {
          child_process.execSync(`cd ./${ options.name } && git init`);
        } catch (error) {
          reject('Cannot create git repository!');
        }

        console.log(chalk.green('Installing dependencies!'));

        try {
          child_process.execSync(`cd ./${ options.name } && npm install`);
        } catch (error) {
          reject('Cannot install dependencies!');
        }

        resolve([
          `Project "${ options.name }" created!\n`,
          'Instructions:',
          '* To start the project:\tnpm start',
          '* To build the project:\tnpm run build',
          '* To create the docs:\tnpm run docs',
          '* To check the code:\tnpm run lint',
          '* To test the project:\tnpm test',
        ]);
      }
    })
    .catch(error => {
      reject('Cannot create project!');
    });
});
