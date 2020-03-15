
const fs = require('fs');

module.exports = {
  get: function (filename) {

    return new Promise(function (resolve, reject) {
      fs.readFile(filename, 'utf8', function(err, content) {
        if (err) reject(err);

        const json = content ? JSON.parse( content ) : [];

        resolve(json);
      } );
    });

  }
}