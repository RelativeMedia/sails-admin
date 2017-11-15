const NOTIFICATION_EMIT = 'NOTIFICATION_EMIT';
const NOTIFICATION_REMOVE = 'NOTIFICATION_REMOVE';

const NOTIFICATION_MAX_VISIBLE = 4;
const NOTIFICATION_AUTO_REMOVE_TIME = 5000;

let _timers = [];
const _emit = (payload) => ({
  type: NOTIFICATION_EMIT,
  payload
});

const _remove = (count = 1) => ({
  type: NOTIFICATION_REMOVE,
  count
});

export const emit = (payload) => (dispatch) => new Promise((resolve) => {
  dispatch(_emit(payload));

  if (payload.dismissible === false || payload.autoDismiss === true) {
    const timerId = setTimeout(() => {
      dispatch(_remove(1));
    }, NOTIFICATION_AUTO_REMOVE_TIME);
    _timers.concat(timerId);
    101;
  }

  return resolve(payload);
});

export const remove = (count = 1) => (dispatch) => new Promise((resolve) => {
  dispatch(_remove(count));
  return resolve();
});

const initialState = {
  items: [],
  queue: [],
  maxVisible: NOTIFICATION_MAX_VISIBLE,
  autoTimeoutInMs: NOTIFICATION_AUTO_REMOVE_TIME
};

export const ACTION_HANDLERS = {
  [NOTIFICATION_EMIT]: (state, {payload}) => {
    if (state.items.length >= NOTIFICATION_MAX_VISIBLE) {
      return {
        ...state,
        queue: [
          ...state.queue,
          payload
        ]
      };
    } else {
      return {
        ...state,
        items: [
          ...state.items,
          payload
        ]
      };
    }
  },
  [NOTIFICATION_REMOVE]: (state, {count}) => {
    let newState = Object.assign({}, state);
    if (state.items.length >= NOTIFICATION_MAX_VISIBLE) {
      newState = {
        items: [
          ...state.items.slice(count),
          ...state.queue.slice(0, 1)
        ],
        queue: [
          ...state.queue.slice(count)
        ]
      };
    } else {
      newState = {
        items: [
          ...state.items.slice(count)
        ],
        queue: newState.queue
      };
    }
    return newState;
  }
};

export default function notificationReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
