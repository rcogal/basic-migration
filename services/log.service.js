
const fs = require('fs');

module.exports = {
  create: function (logData, path) {
    return new Promise( (resolve, reject)  => {
      if (!path) reject("path is empty");

      if (!logData) {
        resolve(false);
      } else {
        fs.writeFile(path, logData, 'utf-8', function() {
          resolve(logData);
        });
      }
    } );

  },

  get: function (path) {
    return new Promise( (resolve, reject) => {

      if (!path) reject("path is empty");

      fs.readFile(path, 'utf8', function(err, content) {
        if (err) reject(err);

        const json = content ? JSON.parse( content ) : [];

        resolve(json);
      } );
    });
  }
}