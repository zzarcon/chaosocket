# Chaosocket
> Create websocket chaos and see how well your app performs

## Defining chaos boundaries

**Chaos registration**
```javascript
const chaos = require('chaosocket');

chaos.register(() => {
  return {
    type: 'connection',
    time: new Date(),
    user: {
      name: ''
    }
  };
});

chaos.listen();
```

**Socket usage**
```javascript
const socket = new WebSocket('ws://0.0.0.0:8080');

socket.onmessage = function(e) {
  const msg = JSON.parse(e.data);

  console.log('onmessage', msg);
};
```

**Frequency**
Sometimes you want to receive more events from a specific type, you achieve that by specifying the **frequency** of the registration. Default value is `medium` and the available ones are `low`, `medium` and `high`. Based on it chaosocket will emit events more or less often.

```javascript
chaos.register(() => {
  return {
    type: 'connection'
  };
}, 'low');

chaos.register(() => {
  return {
    type: 'typing'
  };
}, 'medium');

chaos.register(() => {
  return {
    type: 'message'
  };
}, 'high');
```

TODO: Put demo page link
TODO: Add motivation and use case
TODO: Explain how to use faker
TODO: Mention Faker dependency

## Author

:beers: [@zzarcon](https://twitter.com/zzarcon)