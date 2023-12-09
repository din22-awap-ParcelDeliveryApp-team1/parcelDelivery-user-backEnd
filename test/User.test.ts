import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
const server = require('../server');
import chai from 'chai';

use(chaiHttp);

const serverAddress = 'http://localhost:3001/';

describe('User Register API', function () {
  before(function () {
    server.start();
  });

  after(function () {
    server.close();
  });

  describe('Add a new user to database and delete it', function () {
    let user_id: number;

    it('should add a new user to the database', function (done) {
      //make a post request to the server with user data as body
      chai.request(serverAddress).post('user/').send({
        user_name: 'testuser'+Math.floor(Math.random() * 1000),
        password: 'testpassword',
        first_name: 'testfirst',
        last_name: 'testlast',
        telephone: 'testtelephone',
        email: 'testemail',
        street_address: 'teststreet',
        postal_code: '12345',
        city: 'testcity'
      }).end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.include('User created successfully');
        expect(res.body.newUser).to.have.property('user_name');        
        expect(res.body.newUser).to.have.property('id_user');
        user_id = res.body.newUser.id_user;
        done();
      });
    });

    it('should delete the user from the database', function (done) {
        chai.request(serverAddress).delete('user/' + user_id).end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
        });
    });
  });
});