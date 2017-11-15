import _ from 'lodash';
import Api from 'middleware/api';
import log from 'middleware/logger';

import {Notify} from 'containers/Notification';
import KEYS, { setIsLoading, setHasResults, handleApiErrors } from 'reducers/StateKeys';
import {Services} from 'services';

import {
  DATA_FETCH,
  DATA_FETCHED,
  DATA_FETCH_SINGLE,
  DATA_FETCHED_SINGLE,
  DATA_CREATE,
  DATA_CREATED,
  DATA_DELETE,
  DATA_DELETED,
  DATA_UPDATE,
  DATA_UPDATED
} from 'reducers/data/constants';


// ------------------------------------
// Actions
// ------------------------------------
const _fetch = (endpoint, params) => ({
  type: DATA_FETCH,
  endpoint,
  params
});

const _fetched = (endpoint, payload) => ({
  type: DATA_FETCHED,
  endpoint,
  payload
});

const _fetchSingle = (endpoint, params) => ({
  type: DATA_FETCH_SINGLE,
  endpoint,
  params
});

const _fetchedSingle = (endpoint, payload) => ({
  type: DATA_FETCHED_SINGLE,
  endpoint,
  payload
});

const _create = (endpoint, payload, params) => ({
  type: DATA_CREATE,
  endpoint,
  payload,
  params
});
const _created = (endpoint, payload) => ({
  type: DATA_CREATED,
  endpoint,
  payload
});

const _update = (endpoint, payload, params) => ({
  type: DATA_UPDATE,
  endpoint,
  payload,
  params
});
const _updated = (endpoint, payload) => ({
  type: DATA_UPDATED,
  endpoint,
  payload
});

const _delete = (endpoint, params) => ({
  type: DATA_DELETE,
  endpoint,
  params
});
const _deleted = (endpoint, payload) => ({
  type: DATA_DELETED,
  endpoint,
  payload
});

const handleAuthErrors = (error, dispatch) => {
  if (error.response.status >= 401 && error.response.status <= 403) {
    log.error('Error Not Authorized');
    dispatch(Services.Auth.logout());
  }
};

// ----------------------------------
// Action Thunks
// ------------------------------------

const find = (endpoint, params = { auth: true }) => (dispatch) => new Promise((resolve, reject) => {
  if (!endpoint) return reject('No endpoint provided');

  if (params.auth) {

    params = {
      ...params,
      headers: {
        authorization: 'Bearer ' + Services.Auth.getToken()
      }
    };
  }

  log.debug('Services.' + endpoint + ' find() request - Params:', params);
  dispatch(setIsLoading(KEYS['DATA'], true));
  dispatch(_fetch(endpoint, params));
  Api
    .get(endpoint, params)
    .then((results) => {
      log.debug('Services.' + endpoint + ' find() response - Params:', params, 'Response:', results);
      dispatch(_fetched(endpoint, results.data.data));
      dispatch(setIsLoading(KEYS['DATA'], false));
      dispatch(setHasResults(KEYS['DATA'], !_.isEmpty(results.data)));

      // dispatch(Notify.emit({
      //   title: 'Data Fetched',
      //   style: 'success',
      //   message: 'Data has been fetched from the backend.',
      //   dismissible: false
      // }))

      resolve(results.data);
    })
    .catch((errors) => {
      // handleAuthErrors(errors, dispatch)
      dispatch(handleApiErrors(KEYS['DATA'], true, errors));
      dispatch(setIsLoading(KEYS['DATA'], false));
      dispatch(setHasResults(KEYS['DATA'], false));

      dispatch(Notify.emit({
        title: 'Error Fetching Data',
        style: 'error',
        message: 'Something went wrong while trying to fetch data from the server.',
        dismissible: false
      }));

      return reject(errors);
    });
});

const findOne = (endpoint, params) => (dispatch) => new Promise((resolve, reject) => {
  if (!endpoint) return reject('No endpoint provided');
  if (!params.id) return reject('No ID provided');

  let p = {
    ...params
  };

  delete p.id;
  log.debug('Services.' + endpoint + ' find() request - Params:', p);
  dispatch(setIsLoading(KEYS['DATA'], true));
  dispatch(_fetchSingle(endpoint, p));
  Api
    .get(endpoint + '/' + params.id, p)
    .then((results) => {
      log.debug('Services.' + endpoint + ' find() response - Params:', p, 'Response:', results);
      dispatch(_fetchedSingle(endpoint, results.data));
      dispatch(setHasResults(KEYS['DATA'], !_.isEmpty(results.data)));
      dispatch(setIsLoading(KEYS['DATA'], false));

      // dispatch(Notify.emit({
      //   title: 'Data Fetched',
      //   style: 'success',
      //   message: 'Data has been fetched from the backend.',
      //   dismissible: false
      // }))

      resolve(results.data);
    })
    .catch((errors) => {
      // handleAuthErrors(errors, dispatch)
      dispatch(handleApiErrors(KEYS['DATA'], true, errors));
      dispatch(setIsLoading(KEYS['DATA'], false));
      dispatch(setHasResults(KEYS['DATA'], false));

      dispatch(Notify.emit({
        title: 'Error Fetching Data',
        style: 'error',
        message: 'Something went wrong while trying to fetch data from the server.',
        dismissible: false
      }));

      return reject(errors);
    });

});

const create = (endpoint, payload, params) => (dispatch) => new Promise((resolve, reject) => {
  if (!endpoint) return reject('No Endpoint provided');
  if (!payload) return reject('No Payload provided');

  params = {
    ...params
  };

  log.debug('Services.' + endpoint + ' create() request - Payload:', payload, 'Params:', params);

  dispatch(setIsLoading(KEYS['DATA'], true));
  dispatch(_create(endpoint, params));
  return Api
    .post(endpoint, payload, params)
    .then((results) => {
      log.debug('Services.' + endpoint + ' create() response - Params:', params, 'Response:', results);
      dispatch(_created(endpoint, results.data.data));
      dispatch(setIsLoading(KEYS['DATA'], false));
      dispatch(setHasResults(KEYS['DATA'], !_.isEmpty(results.data)));

      dispatch(Notify.emit({
        style: 'success',
        title: 'Entity Created Successfully',
        message: results.data.message,
        dismissible: false
      }));

      return resolve(results.data.data);
    })
    .catch((errors) => {
      // handleAuthErrors(errors, dispatch)
      dispatch(handleApiErrors(KEYS['DATA'], true, errors));
      dispatch(setIsLoading(KEYS['DATA'], false));
      dispatch(setHasResults(KEYS['DATA'], false));
      dispatch(Notify.emit({
        style: 'error',
        title: 'Error Saving Entity',
        message: '',
        dismissible: false
      }));

      return reject(errors);
    });
});

const edit = (endpoint, params, payload) => (dispatch) => new Promise((resolve, reject) => {
  if (!endpoint) return reject('No Endpoint provided');
  if (!params.id) return reject('No ID provided');

  let p = {
    ...params
  };

  log.debug('Services.' + endpoint + ' edit() request - Params:', p);

  dispatch(setIsLoading(KEYS['DATA'], true));
  dispatch(_update(endpoint, p));
  return Api
    .put(endpoint, payload, p)
    .then((results) => {
      log.debug('Services.' + endpoint + ' edit() response - Params:', p, 'Response:', results);
      dispatch(_updated(endpoint, results.data));
      dispatch(setIsLoading(KEYS['DATA'], false));
      dispatch(setHasResults(KEYS['DATA'], !_.isEmpty(results.data)));

      dispatch(Notify.emit({
        style: 'success',
        title: 'Update Successful',
        message: 'The data has been updated successfully',
        dismissible: false
      }));

      return resolve(results.data.data);
    })
    .catch((errors) => {
      // handleAuthErrors(errors, dispatch)
      dispatch(handleApiErrors(KEYS['DATA'], true, errors));
      dispatch(Notify.emit({
        style: 'error',
        title: 'Error Updating Data',
        message: '',
        dismissible: false
      }));

      return reject(errors);
    });

});

const destroy = (endpoint, params) => (dispatch) => new Promise((resolve, reject) => {
  if (!endpoint) return reject('No Endpoint provided');
  if (!params.id) return reject('No ID provided');

  let p = {
    ...params
  };
  //delete p.id

  log.debug('Services.' + endpoint + ' destroy() request - Params:', p);

  dispatch(setIsLoading(KEYS['DATA'], true));
  dispatch(_delete(endpoint, p));
  return Api
    .destroy(endpoint, p)
    .then((results) => {
      log.debug('Services.' + endpoint + ' destroy() response - Params:', p, 'Response:', results);
      dispatch(_deleted(endpoint, results.data.data));
      dispatch(setIsLoading(KEYS['DATA'], false));
      dispatch(setHasResults(KEYS['DATA'], !_.isEmpty(results.data)));

      dispatch(Notify.emit({
        style: 'success',
        title: 'Deleted Successfully',
        message: results.data.message,
        dismissible: false
      }));

      return resolve(results.data.data);
    })
    .catch((errors) => {
      handleAuthErrors(errors, dispatch);
      dispatch(handleApiErrors(KEYS['DATA'], true, errors));
      dispatch(Notify.emit({
        style: 'error',
        title: 'Error Saving Data',
        message: '',
        dismissible: false
      }));

      return reject(errors);
    });
});

export const DataService = {
  find,
  findOne,
  create,
  edit,
  destroy
};
