/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 16/10/31.
 */

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export {timeout};
