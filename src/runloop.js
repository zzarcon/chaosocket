module.exports = (definitions, userOptions) => {
  const defaultOptions = {delay: 2000};
  const options = Object.assign({}, defaultOptions, userOptions);
  const eventHandlers = {};

  const emitRandomEvent = () => {
    if (!eventHandlers.message) return;

    const msg = {
      name: 'hector'
    };

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