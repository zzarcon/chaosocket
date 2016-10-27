const chaos = require('../src');

chaos.register((faker) => {
  return {
    type: faker.random(['connection', 'message', 'typing']),
    time: faker.fakeTime,
    payload: {

    }
  };
}, 'low') //low, medium, hight --> Default medium

chaos.listen();

const socket = new WebSocket('ws://0.0.0.0:4000');

socket.onopen = function() {
  console.log('onOpen', this.readyState);
};

socket.onmessage = function(e) {
  const msg = JSON.parse(e.data);

  console.log('onmessage', msg);
};


// window.onbeforeunload = () => {
//   const state = socket.readyState;
//   console.log('onbeforeunload', state);

//   if (state === WebSocket.CLOSING || state === WebSocket.CLOSED) return;

//   socket.close();
// };

// chaos.close();