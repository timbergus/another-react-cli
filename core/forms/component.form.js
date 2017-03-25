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
  }
];
