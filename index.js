var domain = require('domain');

module.exports = function messageDomain (opts) {

  opts = opts || {};

  return {

    handleIncoming: function json (channel, message, options, next) {

      var d = domain.create();

      d.on('error', opts.onError || function (err) {
        throw err;
      });

      d.run(function() {

        if (message.properties.correlationId) {
          d.correlationId = message.properties.correlationId;
        }

        next.bind(this, null, channel, message, options)();

      });

    },

  };
};