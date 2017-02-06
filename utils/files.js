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

module.exports.createFile = (project, inFile, outFile, options) => {

  const input = resolve(tool, 'templates', inFile);
  const output = resolve(project, outFile);

  console.log(chalk.yellow(`creating :: ${ outFile }`));

  try {
    fs.writeFileSync(output, createOutput(input, options), writeError => {
      if(writeError) {
        console.log(`Cannot create "${ outFile }"!`);
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
