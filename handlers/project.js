const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const child_process = require('child_process');

const { createFile, copyFile } = require('../utils/files');

const {
  rootFiles,
  srcFiles,
  componentsFiles,
  reducersFiles,
  stylesFiles,
  utilsFiles,
  images
} = require('../config/common-files');

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

  inquirer.prompt(questions).then(options => {

    require(`../config/${ type }-paths`).forEach(path => {
      fs.mkdirSync(`./${ options.name }${ path }`);
    });

    rootFiles.forEach(file => {
      createFile(options.name, file, file, options);
    });

    srcFiles.forEach(file => {
      createFile(`${ options.name }/src`, file, file, options);
    });

    // Here we require the file for "app" folder. The application depends on
    // the user selection.

    require(`../config/${ type }-app`).forEach(file => {
      createFile(`${ options.name }/src/app`, file.path, file.name, options);
    });

    images.forEach(image => {
      copyFile(`${ options.name }/src/images`, image);
    });

    // These files are created only if the application is the big one.

    type === `full` && componentsFiles.forEach(file => {
      createFile(`${ options.name }/src/app/components`, file, file, options);
    });

    type === `full` && reducersFiles.forEach(file => {
      createFile(`${ options.name }/src/app/reducers`, file, file, options);
    });

    type === `full` && stylesFiles.forEach(file => {
      createFile(`${ options.name }/src/app/styles`, file, file, options);
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
  });
});
