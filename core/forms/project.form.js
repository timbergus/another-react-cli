const fs = require('fs');

module.exports = [
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
    type: 'confirm',
    name: 'websockets',
    message: 'websockets:',
    default: false
  },
  {
    type: 'confirm',
    name: 'material-ui',
    message: 'material-ui:',
    default: false
  },
  {
    type: 'confirm',
    name: 'redux',
    message: 'redux:',
    default: false
  },
  {
    type: 'confirm',
    name: 'routes',
    message: 'routes:',
    default: false
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
