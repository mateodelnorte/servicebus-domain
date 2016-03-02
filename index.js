var domain = require('domain');

module.exports = function messageDomain (opts) {

  opts = opts || {};

  opts.modifyDomain = opts.modifyDomain || function (d, channel, message, options) {
    if (message.properties.correlationId) {
      d.correlationId = message.properties.correlationId;
    }
  };

  return {

    handleIncoming: function json (channel, message, options, next) {

      var d = domain.create();

      if (opts.onError) {
        d.on('error', opts.onError);
      }

      d.run(function() {

        opts.modifyDomain.call(this, d, channel, message, options);

        next.bind(this, null, channel, message, options)();

      });

    },

  };
};