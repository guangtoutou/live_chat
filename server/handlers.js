const userTemplates = require('./config/users');

module.exports = function() {
  function getAvailableUsers(_, cb) {
    return cb(null, userTemplates);
  }

  return {
    getAvailableUsers
  };
};
