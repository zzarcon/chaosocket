const nativeSocket = window.WebSocket;

class FakeSocket {
  constructor() {

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

const listen = (url) => {
  window.WebSocket = FakeSocket;
};

const close = () => {

};

module.exports = {
  listen,
  close
};