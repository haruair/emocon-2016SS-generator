var fetch = require('node-fetch');

function getUser(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(user => user.message ? null : user);
}

module.exports = {
  getUser: getUser
};
