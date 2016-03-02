# servicebus-domain
servicebus middleware to automatically run all incoming message code paths within a domain, allowing ability to catch thrown errors.

## middleware

Set up the servicebus-domain middleware as follows:
```
var config = require('cconfig')();
var servicebus = require('servicebus');
var domain = require('servicebus-domain');

var bus = servicebus.bus({
  url: config.RABBITMQ_URL
});

bus.use(domain());

// alternatively:

bus.use(domain({
  onError: function customOnErrorHandler (err) {
    // perform some custom logic here. swallow or throw.
    throw err;
  }
}));

module.exports = bus;
```