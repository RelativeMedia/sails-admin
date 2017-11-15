const chai = require('chai');
const expect = chai.expect;
const faker = require('faker');

const newUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  username: faker.name.firstName(),
  password: faker.internet.password(),
  email: faker.internet.email()
};

let updateUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  username: faker.name.firstName(),
  password: faker.internet.password(),
  email: faker.internet.email()
};

describe('models:User', () => {
  it('Should create new user', (done) => {
    User
      .create(newUser)
      .then(user => {
        expect(user).to.be.an('object');

        expect(user).to.have.any.keys([
          'accountType',
          'firstName',
          'lastName',
          'username',
          'email',
          'id',
          'photo',
          'createdAt',
          'updatedAt'
        ]);

        done();
      })
      .catch(done);
  });

  it('Should remove user', (done) => {
    User
      .destroy({ username: newUser.username })
      .then((users) => {
        expect(users[0].username).to.equal(newUser.username);
        done();
      })
      .catch(done);
  });

  before((done) => {
    User
      .create(updateUser)
      .then(user => {
        expect(user).to.be.an('object');

        expect(user).to.have.any.keys([
          'accountType',
          'firstName',
          'lastName',
          'username',
          'email',
          'id',
          'photo',
          'createdAt',
          'updatedAt'
        ]);

        updateUser = user;
        done();
      })
      .catch(done);
  });
  it('should update a user', (done) => {

    let updatedUser = {
      username: faker.name.firstName()
    }

    User
      .update({ username: updateUser.username }, updatedUser)
      .then((users) => {
        expect(users[0].username).to.equal(updatedUser.username);
        done();
      })
      .catch(done);
  })
});
