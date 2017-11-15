import {ACTION_HANDLERS} from './actions';
import {Schemas} from './schema';
import {denormalize} from 'normalizr';
import _ from 'lodash';

export const initialState = {
  result: [],
  entities: {}
};

export const denormalizer = (entity, state) => {
  return denormalize(_.values(state.data.entities[entity]).map((s) => s.id), Schemas[entity], state.data.entities);
};

export default function authReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
