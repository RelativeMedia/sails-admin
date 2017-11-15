import { schema } from 'normalizr';

const user = new schema.Entity('users');
const group = new schema.Entity('groups', {
  createdBy: user,
  updatedBy: user,
  owner: user
});

user.define({
  createdBy: user,
  updatedBy: user,
  owner: user,
  group
});

export const Schemas = {
  user,
  users: [user],
  group,
  groups: [group]
};
