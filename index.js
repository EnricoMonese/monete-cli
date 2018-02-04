#!/usr/bin/env node

const co = require('co');
const prompt = require('co-prompt');
const program = require('commander');
const moment = require('moment');
const chalk = require('chalk');
const ora = require('ora');
const format = require('string-format')
const clipboardy = require('clipboardy');
const { show, hide } = require('alternate-screen')

program
  .version('0.1.0')
  .option('-c, --copy', 'Copies time to clipboard at the end')
  .option('-p, --precise', 'Show exact time passed as [0h 0m]')
  .option('-s, --same-screen', 'Don\'t output to alternate screen')
  .parse(process.argv);

var elapsed = 0;

co(function *() {
  if(!program.sameScreen) {
    show();
  }
  console.log(chalk.bold.blue(format('Begin tracking time at {}', moment().format('kk:mm'))));
  if(program.copy) {
    console.log("Will copy time in format [0h 0m] to clipboard at the end");
  }
  console.log('\nPress enter to stop\n');

  const spinner = ora('just now').start();
  var timer = setInterval(() => {
    elapsed++;
    spinner.color = 'green';
    spinner.text = time(program.precise);
  }, 1000);
  yield prompt('\r');
  process.stdout.write("\033c");
  show();
  spinner.succeed(chalk.bold.blue(format("Tracked time [{}]",time(program.precise))));
  if(program.copy) {
    var t = time(true);
    clipboardy.writeSync(t);
    console.log(chalk.bold("Copied time to clipboard!"));
  }
  if(!program.sameScreen) {
    yield prompt('\nPress enter again to exit');
    hide();
  }
  process.exit(1);
});

function time (precise = false) {
  var d = moment.duration(elapsed, "seconds");
  if(precise) {
    if(d.hours() > 0) {
      return format("{}h {}m", d.hours(), d.minutes());
    } else if(d.minutes() > 0) {
      return format("{}m", d.minutes());
    }
  }
  return d.humanize();
}
