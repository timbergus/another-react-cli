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
}

const createOutput = (input, options) => {
  return Mustache.render(readFile(input) || '', options);
}

module.exports.createFile = (project, file, options) => {

  const input = resolve(tool, 'templates', file);
  const output = resolve(project, file);

  console.log(chalk.yellow(`creating :: ${ file }`));

  try {
    fs.writeFileSync(output, createOutput(input, options), writeError => {
      if(writeError) {
        console.log(`Cannot create "${ file }"!`);
      }
    });
  }
  catch (error) {
    console.log(error);
  }
};

module.exports.copyFile = (project, image) => {

  const from = resolve(tool, 'templates', image);
  const to = resolve(project, image);

  console.log(chalk.yellow(`copying ::: ${ image }`));

  fs.createReadStream(from).pipe(fs.createWriteStream(to));
}
