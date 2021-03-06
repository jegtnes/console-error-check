var program = require('commander');
var util = require('util');

program
  .version('0.2.1')
  .option('-l', '--log', 'Display console log messages')
  .option('-e', '--no-errors', 'Suppress page errors')
  .option('-r', '--no-resource-errors', 'Suppress resource errors')
  .parse(process.argv);

URLs = program.args;

if (URLs.length === 0) {
  console.error('Please specify at least one site to check.');
  process.exit(1);
}

var Spooky = require('spooky');

var spooky = new Spooky({
  child: {
    transport: 'http'
  },
  casper: {
    logLevel: 'debug',
    verbose: true
  }
}, function (err) {
  if (err) {
    e = new Error('Failed to initialize SpookyJS');
    e.details = err;
    throw e;
  }

  spooky.start();
  spooky.each(URLs, function(self, link) {
      self.thenOpen(link, function() {
      });
  });

  spooky.run();
});

spooky.on('page.error', function (e, stack) {
  console.error('Page error: ' + e);

  if (stack) {
    console.log(util.inspect(stack, {showHidden: false, depth: null}));
  }
});

spooky.on('resource.error', function (e) {
  console.error('Resource error: ');
  console.log(util.inspect(e, {showHidden: false, depth: null}));
});

spooky.on('remote.message', function (msg) {
  console.error('Remote message:');
  console.log(msg);
});
