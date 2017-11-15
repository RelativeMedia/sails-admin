const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const faker = require('faker');

describe('controllers:UserController', () => {
  let user = {};
  let token = '';

  /**
   * create a new user and log the user in to
   * generate a JWT token
   */
  before((done) => {
    User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      username: faker.name.firstName(),
      password: 'password'
    })
    .then((u) => {
      user = u;
      chai
        .request(sails.config.baseUrl)
        .post('/auth/login/local')
        .send({
          username: user.username,
          password: 'password'
        })
        .then(({ status, statusCode, body }) => {
          user = body.data.user;
          token = body.data.token;
          done();
        })
        .catch(done);
    })
    .catch((e) => {
      console.log(e);
    });
  });

  it('should provide a list of all users', (done) => {
    chai
      .request(sails.config.baseUrl)
      .get('/user')
      .set('Authorization', 'Bearer ' + token)
      .then(({ status, statusCode, body}) => {
        const { code, message, data} = body;
        expect(status).to.equal(200);

        expect(body).to.have.keys(['code', 'message', 'data']);

        expect(code).to.equal('OK');
        expect(message).to.equal('Operation is successfully executed');
        expect(data).to.be.an('array');

        expect(data).to.have.length.above(0);
        expect(data[0]).to.have.keys([
          'firstName',
          'lastName',
          'email',
          'username',
          'accountType',
          'createdAt',
          'updatedAt',
          'id'
        ]);
        expect(data[0]).to.not.have.property('password');
      })
      .then(done)
      .catch(done)
  });
  it('should provide a single user give a valid id', (done) => {
    chai
      .request(sails.config.baseUrl)
      .get('/user/1')
      .set('Authorization', 'Bearer ' + token)
      .then(({ status, statusCode, body}) => {
        const {code, message, data} = body;

        expect(statusCode).to.equal(200);

        expect(data).to.be.an('object');
        expect(data).to.have.keys([
          'firstName',
          'lastName',
          'email',
          'username',
          'accountType',
          'createdAt',
          'updatedAt',
          'id'
        ]);
        expect(data).to.not.have.property('password');

        done();
      })
      .catch(done)
  });
  it('should throw an error if no user is found with an invalid id', (done) => {
    chai
      .request(sails.config.baseUrl)
      .get('/user/99')
      .set('Authorization', 'Bearer ' + token)
      .then(({status, statusCode, body}) => {
        const {code, message, data} = body;
        done();
      })
      .catch(({response: {status, statusCode, body}}) => {
        const {code, message, data} = body;
        expect(statusCode).to.equal(404);

        expect(body).to.be.an('object');
        expect(body).to.have.keys(['code', 'data', 'message']);

        expect(code).to.equal('E_NOT_FOUND');
        expect(message).to.equal('The requested resource could not be found but may be available again in the future');
        expect(data).to.equal('No record found with the specified `id`.');
        done();
      });
  });
  it('should throw an error if no token is provided when trying to find() Users', (done) => {
    chai
      .request(sails.config.baseUrl)
      .get('/user')
      .then(({ status, statusCode, body}) => {
        const {code, message, data} = body;
        done();
      })
      .catch(({response: {status, statusCode, body}}) => {
        const {code, message, data} = body;
        expect(statusCode).to.equal(500);

        expect(body).to.be.an('object');
        expect(body).to.have.keys(['code', 'data', 'message']);

        expect(message).to.equal('No auth token');

        done();
      });
  });
  it('should throw an error if no token is provided when trying to findOne() User', (done) => {
    chai
      .request(sails.config.baseUrl)
      .get('/user/2')
      .then(({ status, statusCode, body}) => {
        const {code, message, data} = body;
        done();
      })
      .catch(({response: {status, statusCode, body}}) => {
        const {code, message, data} = body;
        expect(statusCode).to.equal(500);

        expect(body).to.be.an('object');
        expect(body).to.have.keys(['code', 'data', 'message']);

        expect(message).to.equal('No auth token');

        done();
      });
  });
  it('should throw an error if no token is provided when trying to create() a new User', (done) => {
    chai
      .request(sails.config.baseUrl)
      .post('/user')
      .send({
        hostname: 'foobarbaz123'
      })
      .then(({ status, statusCode, body}) => {
        const {code, message, data} = body;
        done();
      })
      .catch(({response: {status, statusCode, body}}) => {
        const {code, message, data} = body;
        expect(statusCode).to.equal(500);

        expect(body).to.be.an('object');
        expect(body).to.have.keys(['code', 'data', 'message']);

        expect(message).to.equal('No auth token');

        done();
      });
  });
  it('should throw an error if no token is provided when trying to delete() a single User', (done) => {
    chai
      .request(sails.config.baseUrl)
      .del('/user/2')
      .then(({ status, statusCode, body}) => {
        const {code, message, data} = body;
        done();
      })
      .catch(({response: {status, statusCode, body}}) => {
        const {code, message, data} = body;
        expect(statusCode).to.equal(500);

        expect(body).to.be.an('object');
        expect(body).to.have.keys(['code', 'data', 'message']);

        expect(message).to.equal('No auth token');

        done();
      });
  });
  it('should throw an error if no token is provided when trying to update() a single User', (done) => {
    chai
      .request(sails.config.baseUrl)
      .put('/user/2')
      .then(({ status, statusCode, body}) => {
        const {code, message, data} = body;
        done();
      })
      .catch(({response: {status, statusCode, body}}) => {
        const {code, message, data} = body;
        expect(statusCode).to.equal(500);

        expect(body).to.be.an('object');
        expect(body).to.have.keys(['code', 'data', 'message']);

        expect(message).to.equal('No auth token');

        done();
      });
  });
});
