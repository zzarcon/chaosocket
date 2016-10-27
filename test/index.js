/**
 * TODO: Reset chaos between tests
 */
const test = require('tape');
const chaos = require('../src');
const FakeSocket = chaos.FakeSocket;

const validRegistration = (faker) => {
  return {
    type: 'connection',
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

test('WebSocket class gets replaced by FakeSocket class', t => {
  t.notOk(window.WebSocket === FakeSocket);
  chaos.listen();
  t.equal(window.WebSocket, FakeSocket);
  chaos.close();
  t.notOk(window.WebSocket === FakeSocket);
  t.end();
});

test('Socket instance receive chaos events', t => {
  t.plan(2);
  chaos.register(validRegistration);

  chaos.listen();

  const socket = new WebSocket('ws://0.0.0.0:4000');

  socket.onmessage = () => {
    t.pass('message received');
  };
});

test.skip('Delay option is configurable', t => {

});

test.skip('Faker is available on chaos registrations', t => {

});

test.skip('Stop emiting chaos after calling "close"', t => {

});

test.skip('Cant start listening for chaos if there are no chaos declaration', t => {

});

test.onFinish(() => {
  window.close();
});