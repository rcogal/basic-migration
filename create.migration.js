const fs = require('fs');
const argv = require('minimist')(process.argv);


// IMPORTANT: filename arg must be required
if (!argv.filename || argv.filename === true) {
  throw 'Migration filename not specified';
}

try {

  const dir = 'migrations';

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  // migration name with current timestamp to prevent duplicates and for sorting purposes
  const migrationName = argv.filename + '.'+ +(new Date());
  const path = 'migrations/' + migrationName + '.js';

  fs.copyFile('__template.migration.js', path, (err) => {
    if (err) throw err;

    console.log('Copied to ' + path);
  });
} catch (ex) {
  console.log("Migration error: ", ex);
}
