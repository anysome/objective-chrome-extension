/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 16/10/31.
 */

import langs from './cn.json';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function translate(message) {
  if (message.indexOf('.')) {
    let keys = message.split('.');
    try {
      let result = langs;
      for (let key of keys) {
        result = result[key];
      }
      return result;
    } catch (e) {
      console.error('no langs for ' + message);
      return message;
    }
  } else {
    return message;
  }
}

export {timeout, translate};
