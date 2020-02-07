const fs = require('fs');
const argv = require('minimist')(process.argv);
const log = require('./services/log.service');

const directoryPath = "migrations";
let state = argv.state || "up";

if (argv.state === true) {
  state = "up";
}


//passsing directoryPath and callback function
fs.readdir(directoryPath, async function (err, files) {

  const logData = [];

  //handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  const logs = await log.get();

  // console.log(logs)

  //listing all files using forEach
  files.forEach( async function (file) {
    const migration = require('./' + directoryPath + '/' + file );
    const item = await migration[state]();

    logData.push( item );
  });

  setTimeout( () => {
    log.create(logData);
  });
});

