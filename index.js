const chaos = require('chaosocket');

chaos.register((faker) => {
  return {
    type: 'connection',
    time: faker.date.recent(),
    payload: {}
  };
}, 'low');
chaos.register((faker) => {
  return {
    type: 'error',
    time: faker.date.recent(),
    payload: {}
  };
}, 'low');
chaos.register((faker) => {
  return {
    type: 'typing',
    time: faker.date.recent(),
    payload: {}
  };
});
chaos.register((faker) => {
  return {
    type: 'message',
    time: faker.date.recent(),
    user: faker.random.arrayElement(['zzarcon', 'hector']),
    payload: {}
  };
}, 'high');

chaos.listen({
  delay: 1000
});

const socket = new WebSocket('ws://0.0.0.0:4000');

socket.onopen = function() {
  console.log('onOpen', this.readyState);
};

socket.onmessage = function(e) {
  const msg = JSON.parse(e.data);

  console.log('onmessage', msg);
};