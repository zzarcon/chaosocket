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
    text: faker.random.arrayElement([]),
    payload: {}
  };
}, 'high');

chaos.listen({
  delay: 1500
});