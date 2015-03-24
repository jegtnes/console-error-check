#!/usr/bin/env node

var program = require('commander');
var util = require('util');

program
  .version('0.1.0')
  .parse(process.argv)

parseURL = program.args[0];

try {
    var Spooky = require('spooky');
} catch (e) {
    var Spooky = require('../lib/spooky');
}

var spooky = new Spooky({
  child: {
    transport: 'http'
  },
  casper: {
    logLevel: 'debug',
    verbose: true,
    clientScripts: ['js-console-listener.js']
  }
}, function (err) {
  if (err) {
    e = new Error('Failed to initialize SpookyJS');
    e.details = err;
    throw e;
  }

  spooky.start(parseURL);
    spooky.run();
});

spooky.on('page.error', function (e, stack) {
  console.error('Page error: ' + e);

  if (stack) {
    console.log(util.inspect(stack, {showHidden: false, depth: null}));
  }
});

spooky.on('remote.message', function (msg) {
  console.log('Console message: ' + msg);
});
