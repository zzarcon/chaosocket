require('./chaos-declaration');

const $ = s => document.querySelector(s);
const dom = {
  messages: $('#messages'),
  payload: $('#messages-payload')
};
const connect = () => {
  const socket = new WebSocket('ws://0.0.0.0:4000');

  socket.onmessage = function(e) {
    const msg = JSON.parse(e.data);
    const payload = msg.payload;
    const type = msg.type;

    console.log('onmessage', msg);

    switch (type) {
      case 'connection':
        renderConnection(payload);
        break;

      case 'typing':
        renderTyping(payload);
        break;

      case 'message':
        renderMessage(payload);
        break;

      case 'disconnection':
        renderDisconnection(payload);
        break;
    }
  };
};

const renderConnection = payload => {
  appendEvent(`
    <span class="username">${payload.user}</span> joined the chat
  `, 'connection');
  appendMessagePayload(payload);
};

const renderTyping = payload => {
  appendEvent(`
    <span class="username">${payload.user}</span> is typing...
  `, 'typing');
  appendMessagePayload(payload);
};

const renderMessage = payload => {
  appendEvent(`
    
  `, 'message');
  appendMessagePayload(payload);
};

const renderDisconnection = payload => {
  appendEvent(`
    <span class="username">${payload.user}</span> disconnected.
  `, 'disconnection');
  appendMessagePayload(payload);
};

const appendEvent = (content, classes) => {
  const msg = document.createElement('div');

  msg.classList.add('event', ...classes);
  msg.innerHTML = content;
  dom.messages.appendChild(msg);
};

const appendMessagePayload = payload => {
  const msg = document.createElement('pre');

  msg.classList.add('payload');
  msg.innerHTML = JSON.stringify(payload, null, 2);
  dom.payload.appendChild(msg);
};

connect();