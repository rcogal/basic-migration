
const fs = require('fs');
const directoryLog = "__log.json";

module.exports = {
  create: function (data, callback) {
    if (!data) return;

    this.get().then( log => {

      if (log) {
        // push the new log data
        const newLog = log.concat( data );
        //convert it back to json
        const logData = JSON.stringify(newLog);

        fs.writeFile(directoryLog, logData, 'utf8', callback || function() {});
      }

    } );

  },

  get: function () {

    return new Promise(function (resolve, reject) {
      fs.readFile(directoryLog, 'utf8', function(err, content) {
        if (err) reject(err);

        const json = content ? JSON.parse( content ) : [];

        resolve(json);
      } );
    });

  }
}