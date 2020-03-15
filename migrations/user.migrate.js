const path = require("path");
const users = require( '../seed/user.json');

module.exports = {
  up: function () {
    return new Promise( async function (resolve, reject) {


      // migration update

      resolve({
        migration: path.basename(__filename),
        timestamp: +(new Date()),
        state: "up"
      });
    });
  },

  down: function () {
    return new Promise(function (resolve, reject) {

      // migration revert

      resolve({
        migration: path.basename(__filename),
        timestamp: +(new Date()),
        state: "down"
      });
    });
  }
};
