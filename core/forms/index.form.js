const fs = require('fs');

module.exports = [{
  type: 'list',
  name: 'command',
  message: 'What do you want to create?',
  default: 'empty application',
  choices: ['empty application', 'full application', 'component']
}];
