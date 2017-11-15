import {
  login,
  loggedIn,
  logout,
  notLoggedIn,
  ACTION_HANDLERS
} from './actions';

export const initialState = {
  isAuthenticated: false,
  user: null,
  token: null
};

export {
  LOGGED_IN,
  LOGGED_OUT,
  LOGIN,
  LOGOUT,
  NOT_LOGGED_IN,
  REFRESH_TOKEN
} from './constants';

export const _login       = login;
export const _loggedIn    = loggedIn;
export const _logout      = logout;
export const _notLoggedIn = notLoggedIn;

export default function authReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
