const path = require("path");

module.exports = {
  up: function () {
    return new Promise(function (resolve, reject) {
      /* Here we write our migration function */
      resolve({
        migration: path.basename(__filename),
        timestamp: +(new Date()),
        state: "up"
      });
    });
  },

  down: function () {
    return new Promise(function (resolve, reject) {
      /* This runs if we decide to rollback. In that case we must revert the `up` function and bring our database to it's initial state */

      resolve({
        migration: path.basename(__filename),
        timestamp: +(new Date()),
        state: "down"
      });
    });
  }
};