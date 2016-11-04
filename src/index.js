require('./chaos-declaration');

const $ = s => document.querySelector(s);
const dom = {
  messages: $('#messages'),
  payload: $('#messages-payload')
};
const connect = () => {
  const socket = new WebSocket('ws://0.0.0.0:4000');

  socket.onmessage = function(e) {
    const event = JSON.parse(e.data);
    const type = event.type;

    console.log('onmessage', event);

    switch (type) {
      case 'connection':
        renderConnection(event);
        break;

      case 'typing':
        renderTyping(event);
        break;

      case 'message':
        renderMessage(event);
        break;

      case 'disconnection':
        renderDisconnection(event);
        break;
    }
  };
};

const renderConnection = event => {
  const payload = event.payload;

  appendEvent(`
    <span class="username">${payload.user}</span> joined the chat
  `, 'connection');
  appendMessagePayload(event);
};

const renderTyping = event => {
  const payload = event.payload;

  appendEvent(`
    <span class="username">${payload.user}</span> is typing...
  `, 'typing');
  appendMessagePayload(event);
};

const renderMessage = event => {
  const payload = event.payload;
  const position = payload.user == 1 ? 'left' : 'right';

  appendEvent(`
    <img class="avatar" src="https://robohash.org/${payload.user}.png?size=50x50">    
    <div class="text">${payload.text}</div>
  `, ['message', position]);
  appendMessagePayload(event);
};

const renderDisconnection = event => {
  const payload = event.payload;

  appendEvent(`
    <span class="username">${payload.user}</span> disconnected.
  `, 'disconnection');
  appendMessagePayload(event);
};

const appendEvent = (content, classes) => {
  classes = Array.isArray(classes) ? classes : [classes];
  classes.push('event');

  const msg = document.createElement('div');
  
  msg.classList.add(...classes);
  msg.innerHTML = content;
  dom.messages.appendChild(msg);
};

const appendMessagePayload = payload => {
  const msg = document.createElement('pre');

  msg.classList.add('payload');
  msg.innerHTML = JSON.stringify(payload, null, 2);
  
  if (dom.payload.children.length) {
    dom.payload.insertBefore(msg, dom.payload.children[0]);
  } else {
    dom.payload.appendChild(msg);
  }

  dom.messages.scrollTop = dom.messages.scrollHeight;
};

connect();