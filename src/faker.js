const faker = require('faker');
const proxiedFaker = new Proxy(faker, {
  get(target, name) {
    if (target[name]) return target[name];
  }
});

module.exports = proxiedFaker;