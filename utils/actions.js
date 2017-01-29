const { projectHandler } = require('../handlers/project');
const { componentHandler } = require('../handlers/component');

module.exports.checkArgs = command => new Promise((resolve, reject) => {
  switch (command) {
    case 'project':
      projectHandler().then(
        response => resolve(response),
        error => reject(error)
      );
      break;
    case 'component':
      componentHandler().then(
        response => resolve(response),
        error => reject(error)
      );
      break;
    default:
      reject('COMAND NOT FOUND');
      break;
  }
});
