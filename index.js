#!/usr/bin/env node
'use strict';

import chalk from 'chalk';
import fetch from 'node-fetch';

var args = process.argv.slice(2);

const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${args[0]}`);
const body = await response.json();

if (body[0]) {
  const { word, phonetic, meanings } = body[0];
  const { definitions } = meanings[0];

  const white = chalk.hex('#fff');
  const smoke = chalk.hex('#ccc');
  const darksmoke = chalk.hex('#aaa');
  const grey = chalk.hex('#777');

  console.log(`\n${white.bold(word)} ${phonetic ? grey(phonetic) : ''}\n`);
  console.log(darksmoke(definitions.map((word, index) => `${++index}. ${word.definition} ${word.example ? `${grey(`example: ${word.example}`)}` : ''}\n`).join('')));
} else {
  console.log(`Could not find definition for ${args[0]}`);
}