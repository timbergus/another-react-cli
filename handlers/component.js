const inquirer = require('inquirer');
const { createFile } = require('../utils/files');

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
  }
];

module.exports.componentHandler = () => new Promise((resolve, reject) => {

  let output = 'src/app/components';

  inquirer.prompt(questions).then(options => {
    createFile('src/app/components', 'component.jsx', `${ options.name }.jsx`, Object.assign(options, {
      name: options.name.charAt(0).toUpperCase() + options.name.slice(1)
    }));
    resolve(`"${ options.name }Component" created!`);
  });
});
