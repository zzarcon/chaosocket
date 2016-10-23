const test = require('tape');
const chaos = require('../src');

const validRegistration = (faker) => {
  return {
    type: faker.random(['connection', 'message', 'typing']),
    time: faker.fakeTime,
    payload: {
      name: 'hector'
    }
  };
};

test('User can register chaos', t => {
  chaos.register(validRegistration, 'low');

  t.equal(typeof chaos.register, 'function');
  t.throws(() => chaos.register(validRegistration, 'notValidFrequency'), 'not a valid frequency');
  t.end();
});

test.onFinish(() => {
  window.close();
});