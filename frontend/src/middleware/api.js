import axios from 'axios';

import config from 'config';
import _ from 'lodash';
import log from 'middleware/logger';

const _buildUrl = (endpoint, params) => {
  let url = config.API_URL;
  url += (endpoint.charAt(0) !== '/') ? '/' + endpoint.toLowerCase() : endpoint.toLowerCase();

  if (params) {
    if (params.id) {
      url += '/' + params.id;
      delete params.id;
    }

    Object.keys(params).map((k, i) => {
      if (i === 0) {
        url += '?' + k + '=' + params[k];
      } else {
        url += '&' + k + '=' + params[k];
      }
    });
  }

  return url;
};

const _request = (endpoint, params, payload, config = {method: 'GET'}) => new Promise((resolve, reject) => {
  let p = _.merge({}, params);
  let headers = _.merge({}, p.headers);

  delete p.headers;
  delete p.auth;

  // if (_.has(p, 'auth')) {
  //   if (p.auth && !p.headers) {
  //     // @TODO Remove stubbed token and use Srervice.Auth.getToken()
  //     // const token = Services.Auth.getToken()
  //     headers.authorization = 'Basic bWhkZXZpdGE6d2VsY29tZXRvc3VtbWVyMjAxNyE=';
  //   }
  //   delete p.auth;
  // }

  if (p.populate) {
    p.populate = p.populate.join(',');
  }

  const url = _buildUrl(endpoint, p);
  log.debug('Api::' + config.method + '::request', url, 'Params:', p, 'Payload:', payload);

  return axios({
    url,
    method: config.method || 'GET',
    p,
    data: payload || null,
    headers
  })
    .then((response) => {
      log.debug('Api::' + config.method + '::response', url);
      return resolve(response);
    })
    .catch((error) => {
      log.error('Api::' + config.method + '::error', error.message, error.response);

      if (error.response.status >= 500) {
        log.error(error.message);
      }

      return reject(error);
    });
});

const Api = {
  get: (endpoint, params) => _request(endpoint, params),
  post: (endpoint, payload, params) => _request(endpoint, params, payload, {method: 'POST'}),
  put: (endpoint, payload, params) => _request(endpoint, params, payload, {method: 'PUT'}),
  destroy: (endpoint, params) => _request(endpoint, params, {}, {method: 'DELETE'})
};

export default Api;
