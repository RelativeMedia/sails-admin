import {
  LOGGED_IN,
  LOGGED_OUT,
  LOGIN,
  LOGOUT,
  NOT_LOGGED_IN
} from './constants';


// ------------------------------------
// Action Thunks
// ------------------------------------
export const login = (payload = {}, params) => ({
  type: LOGIN,
  payload,
  params
});

export const loggedIn = (payload) => ({
  type: LOGGED_IN,
  payload
});

export const logout = (payload) => ({
  type: LOGOUT,
  payload
});

export const notLoggedIn = (payload) => ({
  type: NOT_LOGGED_IN,
  payload
});


// ------------------------------------
// Action Handlers
// ------------------------------------
export const ACTION_HANDLERS = {
  [LOGIN]: (state) => ({
    ...state
  }),
  [LOGGED_IN]: (state, { payload }) => ({
    ...state,
    isAuthenticated: true,
    user: payload.user,
    token: payload.token
  }),
  [LOGOUT]: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    token: null
  }),
  [LOGGED_OUT]: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    token: null
  }),
  [NOT_LOGGED_IN]: (state, { payload }) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    token: null,
    errors: payload.errors
  })
};
