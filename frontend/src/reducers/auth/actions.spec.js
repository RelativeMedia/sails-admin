import authReducer, {initialState} from './index';
import deepFreeze from 'deep-freeze';

deepFreeze(initialState);

import {
  login,
  loggedIn,
  logout
} from './actions';


export {
  LOGGED_IN,
  LOGGED_OUT,
  LOGIN,
  LOGOUT,
  NOT_LOGGED_IN,
  REFRESH_TOKEN
} from './constants';

describe('Reducers.Auth', () => {
  describe('Actions', () => {
    describe('login', () => {
      it('should return a valid action for login', () => {
        const payload = {
          identity: 'admin',
          password: '1234',
          loginType: 'local'
        };

        const params = {
          auth: false
        };

        const expected = {
          type: 'LOGIN',
          payload,
          params
        };

        const actual = login(payload, params);
        expect(actual).toEqual(expected);
      });

      it('should return a non mutated state with the login payload', () => {
        const payload = {
          identity: 'admin',
          password: '1234',
          loginType: 'local'
        };

        const params = {
          auth: false
        };

        const state = initialState;
        const expectedState = {
          ...state
        };

        const action = login(payload, params);
        const newState = authReducer(state, action);

        expect(newState).toEqual(expectedState);
      });
    });

    describe('loggedIn', () => {
      it('should return a valid action for loggedIn', () => {
        const payload = {
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiaWF0IjoxNTEwNjkxMTg5LCJleHAiOjE1MTA3MDU1ODl9.QYeskLbSah95Ci5si_OyCM69ufc9liNODoOFTs3BfA3T2rFojl8pFgM3ji9wPwkl4QTuPKS-szffTWNMZUMyHQ',
          user: {
            updatedBy: {
              username: 'mhdevita',
              email: 'mike.devita@srpnet.com',
              firstName: 'Michael',
              lastName: 'DeVita',
              accountType: 'ad',
              id: 2,
              createdAt: '2017-11-13T15:10:10.000Z',
              updatedAt: '2017-11-13T16:15:45.000Z',
              createdBy: null,
              updatedBy: 2,
              group: 2,
              owner: null
            },
            group: {
              name: 'Admins',
              slug: 'admins',
              id: 3,
              createdAt: '2017-11-13T16:13:13.000Z',
              updatedAt: '2017-11-13T16:13:13.000Z',
              createdBy: null,
              updatedBy: null,
              owner: null
            },
            username: 'admin',
            email: 'admin@demo.com',
            firstName: 'Administrator',
            lastName: 'Freeman',
            accountType: 'local',
            id: 1,
            createdAt: '2017-11-13T14:30:28.000Z',
            updatedAt: '2017-11-13T16:14:00.000Z'
          }
        };

        const expected = {
          type: 'LOGGED_IN',
          payload
        };

        const actual = loggedIn(payload);
        expect(actual).toEqual(expected);
      });
      it('should return a non mutated state with the logged in user', () => {
        const payload = {
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiaWF0IjoxNTEwNjkxMTg5LCJleHAiOjE1MTA3MDU1ODl9.QYeskLbSah95Ci5si_OyCM69ufc9liNODoOFTs3BfA3T2rFojl8pFgM3ji9wPwkl4QTuPKS-szffTWNMZUMyHQ',
          user: {
            updatedBy: {
              username: 'mhdevita',
              email: 'mike.devita@srpnet.com',
              firstName: 'Michael',
              lastName: 'DeVita',
              accountType: 'ad',
              id: 2,
              createdAt: '2017-11-13T15:10:10.000Z',
              updatedAt: '2017-11-13T16:15:45.000Z',
              createdBy: null,
              updatedBy: 2,
              group: 2,
              owner: null
            },
            group: {
              name: 'Admins',
              slug: 'admins',
              id: 3,
              createdAt: '2017-11-13T16:13:13.000Z',
              updatedAt: '2017-11-13T16:13:13.000Z',
              createdBy: null,
              updatedBy: null,
              owner: null
            },
            username: 'admin',
            email: 'admin@demo.com',
            firstName: 'Administrator',
            lastName: 'Freeman',
            accountType: 'local',
            id: 1,
            createdAt: '2017-11-13T14:30:28.000Z',
            updatedAt: '2017-11-13T16:14:00.000Z'
          }
        };

        const state = initialState;
        const expectedState = {
          isAuthenticated: true,
          ...payload
        };

        const action = loggedIn(payload);
        const newState = authReducer(state, action);

        expect(newState).toEqual(expectedState);
      });
    });

    describe('logout', () => {
      it('should return a valid state for logout', () => {
        const payload = {};
        const expected = {
          type: 'LOGOUT',
          payload
        };

        const actual = logout(payload);
        expect(actual).toEqual(expected);
      });

      it('should return a non mutated state with the logout payload', () => {
        const state = {
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwiaWF0IjoxNTEwNjkxMTg5LCJleHAiOjE1MTA3MDU1ODl9.QYeskLbSah95Ci5si_OyCM69ufc9liNODoOFTs3BfA3T2rFojl8pFgM3ji9wPwkl4QTuPKS-szffTWNMZUMyHQ',
          user: {
            updatedBy: {
              username: 'mhdevita',
              email: 'mike.devita@srpnet.com',
              firstName: 'Michael',
              lastName: 'DeVita',
              accountType: 'ad',
              id: 2,
              createdAt: '2017-11-13T15:10:10.000Z',
              updatedAt: '2017-11-13T16:15:45.000Z',
              createdBy: null,
              updatedBy: 2,
              group: 2,
              owner: null
            },
            group: {
              name: 'Admins',
              slug: 'admins',
              id: 3,
              createdAt: '2017-11-13T16:13:13.000Z',
              updatedAt: '2017-11-13T16:13:13.000Z',
              createdBy: null,
              updatedBy: null,
              owner: null
            },
            username: 'admin',
            email: 'admin@demo.com',
            firstName: 'Administrator',
            lastName: 'Freeman',
            accountType: 'local',
            id: 1,
            createdAt: '2017-11-13T14:30:28.000Z',
            updatedAt: '2017-11-13T16:14:00.000Z'
          },
          isAuthenticated: true
        };

        const action = logout();
        const newState = authReducer(state, action);

        expect(newState).toEqual(initialState);
      });
    });
  });
});
