import jwtDecode from 'jwt-decode';
import Api from 'middleware/api';
import log from 'middleware/logger';
import {Notify} from 'containers/Notification';
import KEYS, { handleApiErrors } from 'reducers/StateKeys';

import {
  _login,
  _loggedIn,
  _logout,
  _notLoggedIn
} from 'reducers/auth';

// ------------------------------------
// Helpers
// ------------------------------------
const isAuthenticated = () => {
  log.debug('Services.Auth.isAuthenticated()');
  return !!getToken();
};

const decodeToken = (token) => {
  if (token || token !== 'undefined') {
    return jwtDecode(token);
  }
};

const getUser = () => {
  return localStorage.getItem('user');
};

const getToken = () => {
  return localStorage.getItem('token');
};

const removeToken = () => {
  return localStorage.removeItem('token');
};

const removeUser = () => {
  return localStorage.removeItem('user');
};

const storeToken = (token) => {
  if (token || token !== 'undefined') {
    return localStorage.setItem('token', token);
  }
};

const storeUser = (user) => {
  if (user || user !== 'undefined') {
    return localStorage.setItem('user', JSON.stringify(user));
  }
};

// ------------------------------------
// Action Thunks
// ------------------------------------

/**
 * decodes the token from localStorage
 * and checks to see if its expired or not.
 */
const setup = () => (dispatch) => {
  const token = getToken();
  const decodedToken = decodeToken(token);
  const user = JSON.parse(getUser());
  const date = new Date().getTime();

  // check if the token is expired or not
  if (decodedToken.exp * 1000 < date) {
    log.debug('Services.Auth.setup() :: token is expired, relogging in');
    // dispatch(refresh_token({ token }));
    dispatch(logout());
  } else if (user.groups && user.groups.some((g) => g.slug === 'admins')) {
    log.debug('Services.Auth.setup() :: You are not authorized to access this page.');
    dispatch(logout());
  } else if (token && user) {
    log.debug('Services.Auth.setup() :: token and user exists in localStorage, initiating authLoginSuccess()');
    dispatch(_loggedIn({user, token}));
  } else {
    log.debug('Services.Auth.setup() :: token/user doesn\'t exist in localStorage, initiating authNotLoggedIn()');
    dispatch(_notLoggedIn());
  }
};

/**
 * Logout a user and remove token/user object
 * from localStorage.
 * Redirects to the login page.
 * @TODO: this is stubbed for now, but the backend call should be made to clear the token and do server side cleanup.
 */
const logout = () => (dispatch) => new Promise ((resolve) => {
  dispatch(_logout());
  removeToken();
  removeUser();
  return resolve();
});

/**
 * login a user
 * @param payload {Object} identity, password of user
 * @param params {Object} Any additional paramss to pass along
 */
const login = (payload, params = {}) => (dispatch) => new Promise((resolve, reject) => {
  params = {
    auth: false,
    ...params
  };

  let endpoint = '/auth/login/' + payload.loginType;

  dispatch(_login(payload, params));
  log.debug('Services.Auth::login()::request - Params:', params, 'Payload:', payload);

  return Api
    .post(endpoint, payload, params)
    .then((results) => {
      const data = results.data.data;
      log.debug('Services.Auth::login()::response - Params:', params, 'Data:', data);

      const user = data.user;
      if (!user.group && user.group.some((g) => g.slug !== 'admins')) {
        log.debug('Services.Auth.login() :: You are not authorized to access this page.');
        dispatch(Notify.emit({
          title: 'Not Authorized',
          style: 'error',
          message: 'You are not authorized to access this page.',
          dismissible: false
        }));

        // dispatch(logout())
        // browserHistory.push('/auth/login')
        return reject(data);
      } else {
        dispatch(_loggedIn(data));
        storeToken(data.token);
        storeUser(data.user);

        dispatch(Notify.emit({
          title: 'Logged In',
          style: 'success',
          message: 'You are now logged in.',
          dismissible: false
        }));

        return resolve(data);
      }
    })
    .catch((error) => {
      log.error(error.response.data.message);
      dispatch(Notify.emit({
        title: 'General Error',
        style: 'error',
        message: error.response.data.message,
        dismissible: false
      }));
      dispatch(handleApiErrors(KEYS['AUTH'], true, error));
      return reject(error);
    });
});

export const AuthService = {
  login,
  logout,
  setup,
  getToken,
  isAuthenticated
};
