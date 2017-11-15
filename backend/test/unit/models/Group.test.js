const chai = require('chai');
const expect = chai.expect;
const faker = require('faker');

let newGroup = {
  name: faker.name.firstName()
};

describe('models:Group', () => {
  beforeEach((done) => {
    Group
      .create(newGroup)
      .then(group => {
        expect(group).to.be.an('object');
        expect(group).to.have.any.keys([
          'id',
          'name',
          'description',
          'slug',
          'createdAt',
          'createdBy',
          'updatedAt',
          'updatedBy'
        ]);

        newGroup = group;
        done();
      })
      .catch(done);
  });

  it('Should create new group', (done) => {
    Group
      .create(newGroup)
      .then(group => {
        expect(group).to.be.an('object');
        expect(group).to.have.any.keys([
          'id',
          'name',
          'description',
          'slug',
          'createdAt',
          'createdBy',
          'updatedAt',
          'updatedBy'
        ]);

        done();
      })
      .catch(done);
  });

  it('Should remove group', (done) => {
    Group
      .destroy({ name: newGroup.name })
      .then((groups) => {
        expect(groups[0].name).to.equal(newGroup.name);
        done();
      })
      .catch(done);
  });

  it('should update a group', (done) => {

    let updatedGroup = {
      name: faker.name.firstName()
    }

    Group
      .update({ name: updateGroup.name }, updatedGroup)
      .then((groups) => {
        expect(groups[0].name).to.equal(updatedGroup.name);
        done();
      })
      .catch(done);
  })
});
