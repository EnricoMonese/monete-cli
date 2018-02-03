#!/usr/bin/env node
var co = require('co');
var prompt = require('co-prompt');
var program = require('commander');
var moment = require('moment');
const chalk = require('chalk');

program
  .version('0.1.0')
  .arguments('<project>')
  .command('list', 'Display list of projects with relative time')
  .command('project', 'Edit a project\'s name or recorded time')
  .command('full', '"Fullscreen" mode (coming soon)')
  .option('-d, --desc --description', 'Description for new sesion')
  .parse(process.argv);

//TODO load saved stuff

//TODO if saved contains project else ask to create
var project = program.args[0].toUpperCase();

var elapsed = 0;

co(function *() {
  console.log(chalk.blue("Begin tracking time for %s at %s", project, moment().format('LT')));
  var timer = setInterval(function () {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(parseTime(elapsed)); //TODO parse time
    elapsed++;
  }, 1000);
  yield prompt('');
  clearInterval(timer);
  console.log("Tracked time ["+parseTime(elapsed)+"]");
  process.exit(1);
});

function parseTime (seconds) {
  return moment.duration(seconds, "seconds").humanize();
}
