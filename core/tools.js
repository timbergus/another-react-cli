const fs = require('fs');
const chalk = require('chalk');
const Mustache = require('mustache');
const { resolve, dirname } = require('path');

const tool = dirname(require.main.filename);

const readFile = file => {
  try {
    return fs.readFileSync(file, 'utf-8');
  } catch (error) {
    return false;
  }
};

const parseTemplate = (input, options) => {
  return Mustache.render(readFile(input) || '', options);
};

module.exports.createElement = (options, file, path, type = '') => {

  let name = '';

  if (type !== 'component') {
    name = options.name;
  }

  const from = resolve(tool, ...path, file.name);
  let to = resolve(name, ...file.path, file.name);

  if (type === 'component') {
    to = resolve(name, ...file.path, `${ options.name }.component.jsx`);
  }

  file.path.reduce((path, folder) => {
    try {
      fs.mkdirSync(resolve(path, folder));
    } catch (error) {}
    return resolve(path, folder);
  }, name);

  console.log(chalk.yellow('creating :::'), chalk.white(file.name));

  if (file.template) {
    try {
      fs.writeFileSync(to, parseTemplate(from, options), writeError => {
        if(writeError) {
          console.log(`Cannot create "${ file.name }"!`);
        }
      });
    }
    catch (error) {}
  } else {
    fs.createReadStream(from).pipe(fs.createWriteStream(to));
  }
};
