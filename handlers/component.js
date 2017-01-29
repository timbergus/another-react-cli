const inquirer = require('inquirer');
const { createFile } = require('../utils/files');

const component = `import React, { Component } from 'react';

export default class {{ name }}Component extends Component {
  render () {
    return(
      <h1>Hello from Component!</h1>
    );
  }
}
`;

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
  inquirer.prompt(questions).then(options => {
    createFile(`./src/app`, [{
      name: `${ options.name }.jsx`,
      template: component
    }], Object.assign(options, {
      name: options.name.charAt(0).toUpperCase() + options.name.slice(1)
    }));
    resolve(`Component "${ options.name }" created!`)
  });
});
