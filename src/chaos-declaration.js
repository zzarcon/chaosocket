const chaos = require('chaosocket');

chaos.register((faker) => {
  return {
    type: 'connection',
    time: faker.date.recent(),
    payload: {
      user: faker.random.arrayElement(['zzarcon', 'hector'])
    }
  };
}, 'low');
chaos.register((faker) => {
  return {
    type: 'disconnection',
    time: faker.date.recent(),
    payload: {
      user: faker.random.arrayElement(['zzarcon', 'hector'])
    }
  };
}, 'low');
chaos.register((faker) => {
  return {
    type: 'typing',
    time: faker.date.recent(),
    payload: {
      user: faker.random.arrayElement(['zzarcon', 'hector'])
    }
  };
});
chaos.register((faker) => {
  return {
    type: 'message',
    time: faker.date.recent(),
    payload: {
      user: faker.random.arrayElement([1, 2]),
      text: faker.lorem.sentence()
    }
  };
}, 'high');

chaos.listen({
  delay: 1500
});