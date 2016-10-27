const fakeSocket = require('./fakesocket');
const definitions = {
  low: [],
  medium: [],
  high: []
};

const chaosocket = () => {
  const isValidFrequency = (frequency) => {
    return Object.keys(definitions).indexOf(frequency) > -1;
  };

  const register = (definition, frequency = 'medium') => {
    if (!isValidFrequency(frequency)) {
      throw new Error(`${frequency} is not a valid frequency`);
    }

    definitions[frequency].push(definition);
  };

  const listen = (options) => {
    fakeSocket.listen(definitions, options);
  };

  const close = () => {
    fakeSocket.close();
  };

  return {
    register,
    listen,
    close,
    FakeSocket: fakeSocket.FakeSocket
  };
};

module.exports = chaosocket();