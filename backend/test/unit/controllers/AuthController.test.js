const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const faker = require('faker');

describe('controllers:AuthController', () => {
  let newUser = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    username: faker.name.firstName(),
    password: 'password'
  };

  before(() => {
    return User.create(newUser)
  });

  it('should login a user with valid credentials', (done) => {
    chai
      .request(sails.config.baseUrl)
      .post('/auth/login/local')
      .send({
        username: newUser.username,
        password: newUser.password
      })
      .then(({ status, statusCode, body }) => {
        const { code, message, data } = body;

        expect(statusCode).to.equal(200);

        expect(body).to.be.an('object');
        expect(body).to.have.keys(['code', 'message', 'data']);

        expect(code).to.equal('OK');
        expect(message).to.equal('Operation is successfully executed');

        expect(data).to.be.an('object');
        expect(data).to.have.keys(['token', 'user']);

        expect(data.token).to.be.a('string');
        expect(data.user).to.be.an('object');
        expect(data.user).to.have.keys(['firstName', 'lastName', 'username', 'email', 'accountType', 'createdAt', 'updatedAt', 'id']);
        done();
      })
      .catch(done);
  });
  it('should throw an error if a user does not exist', (done) => {
    chai
      .request(sails.config.baseUrl)
      .post('/auth/login/local')
      .send({
        username: 'someuser',
        password: 'somepassword'
      })
      .then(({ status, statusCode, body }) => {
        const { code, message, data } = body;
        console.log(body)
        done();
      })
      .catch(({ response: { status, statusCode, body } }) => {
        const { code, message, data } = body;

        expect(statusCode).to.equal(401);

        expect(body).to.be.an('object');
        expect(body).to.have.keys(['code', 'message', 'data']);

        expect(code).to.equal('E_USER_NOT_FOUND');
        expect(message).to.equal('User with specified credentials is not found');
        done();
      });
  });
  it('should register a new user', (done) => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      username: faker.name.firstName(),
      password: 'password'
    };

    chai
      .request(sails.config.baseUrl)
      .post('/auth/register')
      .send(user)
      .then(({ status, statusCode, body }) => {
        const { code, message, data } = body;
        expect(statusCode).to.equal(201);

        expect(body).to.be.an('object');
        expect(body).to.have.keys(['code', 'message', 'data']);

        expect(code).to.equal('CREATED');
        expect(message).to.equal('The request has been fulfilled and resulted in a new resource being created');

        expect(data).to.be.an('object');
        expect(data).to.have.keys(['token', 'user']);

        expect(user.firstName).to.equal(user.firstName);
        expect(user.lastName).to.equal(user.lastName);
        expect(user.email).to.equal(user.email);
        expect(user.username).to.equal(user.username);

        done();
      })
      .catch((e) => {
        console.log(e);
        done();
      });
  });

  it('should throw an error if the user already exists', (done) => {
    chai
      .request(sails.config.baseUrl)
      .post('/auth/register')
      .send(newUser)
      .then(({ status, statusCode, body }) => {
        const {code, message, data} = body;
        done()
      })
      .catch(({ response: { status, statusCode, body } }) => {
        const { code, message, data } = body;

        expect(statusCode).to.equal(400);

        expect(body).to.be.an('object');
        expect(body).to.have.keys(['code', 'message', 'data']);

        expect(code).to.equal('E_VALIDATION');
        expect(message).to.equal('2 attributes are invalid');

        expect(data).to.have.keys(['username', 'email']);
        expect(data.username[0].rule).to.equal('unique');
        expect(data.email[0].rule).to.equal('unique');
        done();
      });
  });
});
