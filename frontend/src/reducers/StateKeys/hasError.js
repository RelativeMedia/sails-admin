import _ from 'lodash';

import {Services} from 'services';
import * as KEYS from './keys';

const SET_HAS_ERROR = 'SET_HAS_ERROR';

export const setHasError = (stateKey, hasError, errors) => ({
  type: 'SET_HAS_ERROR',
  payload: {
    hasError,
    stateKey,
    errors
  }
});

export const getErrors = (state, stateKey) => {
  return state.hasError[stateKey];
};

function _applyHasError(state, action) {
  const {stateKey, hasError, errors} = action.payload;
  return {
    ...state,
    [stateKey]: hasError,
    errors
  };
}

const ACTION_HANDLERS = {
  [SET_HAS_ERROR]: (state, action) => {
    return _applyHasError(state, action);
  }
};

// handleApiErrors(KEYS['SERVER'], true, [])
export const handleApiErrors = (key, hasError = true, errors) => (dispatch) => {
  if (!_.isEmpty(errors)) {
    let {status} = errors;
    dispatch(setHasError(key, hasError, errors));
    if (status === 401) {
      dispatch(Services.Auth.logout());
      // const message = 'Login expired, please login again.'
    }

    // dispatch(Notification.emit({
    //   msg: message,
    //   visible: true,
    //   dismissible: true,
    //   type: 'danger'
    // }))
  } else {
    dispatch(setHasError(key, hasError, errors));
    // dispatch(Notification.emit({
    //   msg: 'Unkown server error occured, please try again later.',
    //   visible: true,
    //   dismissible: true,
    //   type: 'danger'
    // }))
  }
};

let initialState = {
  errors: []
};
_.each(KEYS, (k) => {
  if (k !== 'undefined') {
    initialState[k] = false;
  }
});

export function hasErrorReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
