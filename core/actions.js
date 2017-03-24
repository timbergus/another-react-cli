// Actions is the firs step. It creates the main menu where you can select
// which project or element you want to create.

const { projectHandler } = require('./handlers/project');
const { componentHandler } = require('./handlers/component');

module.exports.checkArgs = command => new Promise((resolve, reject) => {
  switch (command) {
    case 'empty application':
      projectHandler('empty').then(
        response => resolve(response),
        error => reject(error)
      );
      break;
    case 'full application':
      projectHandler('full').then(
        response => resolve(response),
        error => reject(error)
      );
      break;
    case 'component':
      componentHandler('component').then(
        response => resolve(response),
        error => reject(error)
      );
      break;
    default:
      reject('COMAND NOT FOUND');
      break;
  }
});
