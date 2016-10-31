/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 16/10/31.
 */

import langs from './en.json';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function translate(message) {
  console.log(`tips = ${message}`);
  return langs[message] || message;
}

export {timeout, translate};
