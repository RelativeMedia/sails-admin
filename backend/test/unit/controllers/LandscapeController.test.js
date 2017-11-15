const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const faker = require('faker');

describe('controllers:LandscapeController', () => {
  let user = {};
  let token = '';

  /**
   * create a new user and log the user in to
   * generate a JWT token
   */
  before((done) => {
    chai
      .request(sails.config.baseUrl)
      .post('/auth/login/local')
      .send({
        username: 'testuser',
        password: 'password'
      })
      .then(({ status, statusCode, body }) => {
        const { code, message, data} = body;
        user = data.user;
        token = data.token;

        done();
      })
      .catch(done);
  });

  it('should list all landscapes', (done) => {
    chai
      .request(sails.config.baseUrl)
      .get('/landscape')
      .set('Authorization', 'Bearer ' + token)
      .then(({ status, statusCode, body}) => {
        const {code, message, data} = body;
        expect(status).to.equal(200);

        expect(body).to.have.keys(['code', 'message', 'data']);

        expect(code).to.equal('OK');
        expect(message).to.equal('Operation is successfully executed');
        expect(data).to.be.an('array');
        expect(data).to.have.length.above(0);

        done();
      })
      .catch(done);
  });
  it('should list a single landscape given a valid id', (done) => {
    chai
      .request(sails.config.baseUrl)
      .get('/landscape/2')
      .set('Authorization', 'Bearer ' + token)
      .then(({ status, statusCode, body}) => {
        const {code, message, data} = body;

        expect(status).to.equal(200);

        expect(body).to.have.keys(['code', 'message', 'data']);

        expect(code).to.equal('OK');
        expect(message).to.equal('Operation is successfully executed');
        expect(data).to.be.an('object');

        done();
      })
      .catch(done);
  });
  it('should throw an error if no landscape is found with an invalid id', (done) => {
    chai
      .request(sails.config.baseUrl)
      .get('/landscape/99')
      .set('Authorization', 'Bearer ' + token)
      .then(({ status, statusCode, body}) => {
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
  it('should throw an error if no token is provided when trying to find() Landscapes', (done) => {
    chai
      .request(sails.config.baseUrl)
      .get('/landscape')
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
  it('should throw an error if no token is provided when trying to findOne() Landscape', (done) => {
    chai
      .request(sails.config.baseUrl)
      .get('/landscape/2')
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
  it('should throw an error if no token is provided when trying to create() a new Landscape', (done) => {
    chai
      .request(sails.config.baseUrl)
      .post('/landscape')
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
  it('should throw an error if no token is provided when trying to delete() a single Landscape', (done) => {
    chai
      .request(sails.config.baseUrl)
      .del('/landscape/2')
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
  it('should throw an error if no token is provided when trying to update() a single Landscape', (done) => {
    chai
      .request(sails.config.baseUrl)
      .put('/landscape/2')
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
