const inquirer = require('inquirer');
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
  }
];

module.exports.componentHandler = type => new Promise((resolve, reject) => {
  inquirer.prompt(questions)
    .then(options => {

      let newOptions = Object.assign(options, {
        name: options.name.charAt(0).toUpperCase() + options.name.slice(1)
      });

      require(`../../modules/${ type }/config.json`).forEach(file => {
        createElement(newOptions, file, ['modules', type, 'templates'], type);
      });

      resolve(`"${ options.name }Component" created!`);
    });
});
