#!/usr/bin/env node
const co = require('co');
const prompt = require('co-prompt');
const program = require('commander');
const moment = require('moment');
const chalk = require('chalk');
const ora = require('ora');
const format = require('string-format')

program
  .version('0.1.0')
  .option('-c --copy', 'Copies time to clipboard at the end')
  .option('-v, --verbose', 'Show exact time passed')
  .parse(process.argv);

var elapsed = 0;

co(function *() {
  console.log(
    chalk.bold.blue(
      format('\nBegin tracking time at {}\n', moment().format('kk:mm'))
    )
  );
  const spinner = ora('just now').start();
  var timer = setInterval(() => {
    spinner.color = 'green';
    spinner.text = niceTime(elapsed);
    elapsed++;
  }, 1000);
  yield prompt('');
  .succeed("Tracked time [{}]".format(niceTime(elapsed)));
  console.log('');
  process.exit(1);
});

function niceTime (seconds) {
  return moment.duration(seconds, "seconds").humanize();
}
