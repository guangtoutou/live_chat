const userTemplates = require('./config/users');
const chatRoomTemplates = require('./config/chatrooms');

module.exports = function() {
  function getAvailableUsers(_, cb) {
    return cb(null, userTemplates);
  }

  function getChatRooms(_, cb) {
    return cb(null, chatRoomTemplates);
  }

  return {
    getAvailableUsers,
    getChatRooms
  };
};
