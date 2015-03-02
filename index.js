#!/usr/bin/env node

var program = require('commander')

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
    verbose: true
  }
}, function (err) {
  if (err) {
    e = new Error('Failed to initialize SpookyJS');
    e.details = err;
    throw e;
  }

  spooky.start(parseURL);
  spooky.then(function () {
    this.emit('hello', 'Hello, from ' + this.evaluate(function () {
      return document.title;
    }));
  });
  spooky.run();
});

spooky.on('error', function (e, stack) {
  console.error(e);

  if (stack) {
    console.log(stack);
  }
});

spooky.on('hello', function (greeting) {
  console.log(greeting);
});

spooky.on('log', function (log) {
  if (log.space === 'remote') {
    console.log(log.message.replace(/ \- .*/, ''));
  }
});
