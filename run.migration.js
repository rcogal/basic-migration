const fs = require('fs');
const argv = require('minimist')(process.argv);
const log = require('./services/log.service');

const directoryLog = "__log.json";
const directoryMigration = "migrations";
const directoryErrorLog = "error.log";

// default state
let state = argv.state || "up";

if (argv.state === true) {
  state = "up";
}

//passsing directoryPath and callback function
fs.readdir(directoryMigration, async function (err, files) {

  const logData = [];

  //handling error
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  try {

  } catch(ex) {
    log.create
  }

  const logs = await log.get(directoryLog);
  const migrations = (logs || []).map( item => item.migration );


  const migrationFiles = files || [];


  for (let i=0; i<migrationFiles.length; i++) {
    const file = migrationFiles[i];

    if (!migrations.includes( file )) {
      const migration = require( './' + directoryMigration + '/' + file );
      const currentMigrationInfo = await migration[state]();

      const currentMigrations = await log.get(directoryLog);
      // create a log for the new migration for reference
      const newLog = currentMigrations.concat( currentMigrationInfo );
      //convert it back to json
      const logData = JSON.stringify(newLog);

      // log the executed migration
      const logs = await log.create(logData, directoryLog);
      // console log of the current ran
      console.log( +new Date(), currentMigrationInfo);
    }
  }
});
