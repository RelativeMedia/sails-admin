import {normalize} from 'normalizr';
import pluralize from 'pluralize';
import {Schemas} from './schema';
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
} from './constants';


export const ACTION_HANDLERS = {
  [DATA_FETCH]: (state) => {
    return {
      ...state
    };
  },
  [DATA_FETCHED]: (state, {endpoint, payload}) => {
    const pluralizedEndpoint = pluralize(endpoint);
    const normalizedData = normalize(payload, Schemas[pluralizedEndpoint]);
    return {
      ...state,
      entities: {
        ...state.entities,
        ...normalizedData.entities
      },
      result: [
        ...state.result,
        ...normalizedData.result
      ]
    };
  },
  [DATA_FETCH_SINGLE]: (state) => ({
    ...state
  }),
  [DATA_FETCHED_SINGLE]: (state, {endpoint, payload}) => {
    const normalizedData = normalize(payload, Schemas[endpoint]);
    let newState = {
      ...state,
      entities: normalizedData.entities,
      result: normalizedData.result

    };
    return newState;
  },
  [DATA_CREATE]: (state) => {
    return {
      ...state
    };
  },
  [DATA_CREATED]: (state) => {
    return state;
  },
  [DATA_DELETE]: (state) => {
    return state;
  },
  [DATA_DELETED]: (state, {endpoint, payload}) => {
    const pluralizedEndpoint = pluralize(endpoint);
    let newState = {
      ...state,
      entities: {
        ...state.entities,
        [pluralizedEndpoint]: {
          ...state.entities[pluralizedEndpoint],
          [payload.id]: payload
        }
      },
      //result: state.result.filter((v) => v !== payload.id)
      result: state.result
    };
    //delete newState.entities[pluralizedEndpoint][payload.id];
    return newState;
    //console.log(state.entities, pluralizedEndpoint, payload)
    //const entityIndex = _.findIndex({ id: state.entities[pluralizedEndpoint].id }, { id: payload.id })
    //console.log(entityIndex)
    //return {
    //  ...state,
    //  entities: {
    //    ...state.entities,
    //    ...normalizedData.entities
    //  },
    //  result: normalizedData.result
    //}
  },
  [DATA_UPDATE]: (state) => ({
    ...state
  }),
  [DATA_UPDATED]: (state, {endpoint, payload}) => {
    const pluralizedEndpoint = pluralize(endpoint);
    const normalizedData = normalize(payload, Schemas[pluralizedEndpoint]);
    return {
      ...state,
      entities: {
        ...state.entities,
        ...normalizedData.entities
      },
      result: [
        ...state.result,
        ...normalizedData.result
      ]
    };
  }
};
