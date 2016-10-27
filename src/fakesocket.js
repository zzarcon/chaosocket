/**
 * Replaces native WebSocket with a fake behaviour.
 * Uses runloop api to emit fake messages, also
 * serializes and deserializes messages.
 */
const R = require('./runloop');
const nativeSocket = window.WebSocket;
let runloop;

class FakeSocket {
  constructor() {
    this._runloop = runloop;

    this._runloop.on('message', this._onRunloopEvent(this));
  }

  _onRunloopEvent(socket) {
    return (message) => {
      if (!socket.onmessage) return;

      const messageText = JSON.stringify(message);

      //TODO: Replicate Event interface
      //TODO: Check if we have to bind the method with the socket context
      socket.onmessage({data: messageText});
    };
  }

  static get CLOSED() {
    return nativeSocket.CLOSED;
  }
  static get CLOSING() {
    return nativeSocket.CLOSING;
  }
  static get CONNECTING() {
    return nativeSocket.CONNECTING;
  }
  static get OPEN() {
    return nativeSocket.OPEN;
  }
}

const listen = (definitions) => {
  runloop = R(definitions);
  window.WebSocket = FakeSocket;
  
  runloop.poll();
};

const close = () => {
  window.WebSocket = nativeSocket;
  runloop.stop();
};

module.exports = {
  listen,
  close
};