const faker = require('./faker');
const getPriority = (chaosDefinitions) => {
  const rand = Math.random();
  const frequencies = {
    low: 0.2,
    medium: 0.4,
    high: 1
  };
  const validFrequencies = Object.keys(frequencies).filter(f => !!chaosDefinitions[f].length);

  return validFrequencies.reduce((prev, current) => {
    if (prev) return prev;

    return rand < frequencies[current] ? current : null;
  }, null);
};
const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

module.exports = (chaosDefinitions, userOptions) => {
  const defaultOptions = {delay: 2000};
  const options = Object.assign({}, defaultOptions, userOptions);
  const eventHandlers = {};

  const emitRandomEvent = () => {
    if (!eventHandlers.message) return;

    const priority = getPriority(chaosDefinitions);
    const msg = randomItem(chaosDefinitions[priority])(faker);

    eventHandlers.message.forEach(cb => cb(msg));
  };

  const poll = () => {
    emitRandomEvent();
    setInterval(emitRandomEvent, defaultOptions.delay);
  };

  const stop = () => {

  };

  const on = (eventName, cb) => {
    eventHandlers[eventName] = eventHandlers[eventName] || [];
    eventHandlers[eventName].push(cb);
  };

  return {
    poll,
    stop,
    on
  };
};