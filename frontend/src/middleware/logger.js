import * as loglevel from 'loglevel';

if (__DEV__) {
  loglevel.setLevel('debug');
} else {
  loglevel.setLevel('error');
}

export default loglevel;
