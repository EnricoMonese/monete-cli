#!/usr/bin/env node

var program = require('commander');

program
  .version('0.1.0')
  .arguments('<file>')
  .option('-u, --username <username>', 'The user to authenticate as')
  .option('-p, --password <password>', 'The user\'s password')
  .parse(process.argv);
