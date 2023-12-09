"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const chai_http_1 = __importDefault(require("chai-http"));
const server = require('../server');
const chai_2 = __importDefault(require("chai"));
(0, chai_1.use)(chai_http_1.default);
const serverAddress = 'http://localhost:3001/';
describe('User Register API', function () {
    before(function () {
        server.start();
    });
    after(function () {
        server.close();
    });
    describe('Add a new user to database and delete it', function () {
        let user_id;
        it('should add a new user to the database', function (done) {
            //make a post request to the server with user data as body
            chai_2.default.request(serverAddress).post('user/').send({
                user_name: 'testuser' + Math.floor(Math.random() * 1000),
                password: 'testpassword',
                first_name: 'testfirst',
                last_name: 'testlast',
                telephone: 'testtelephone',
                email: 'testemail',
                street_address: 'teststreet',
                postal_code: '12345',
                city: 'testcity'
            }).end(function (err, res) {
                (0, chai_1.expect)(err).to.be.null;
                (0, chai_1.expect)(res).to.have.status(201);
                (0, chai_1.expect)(res.body).to.be.a('object');
                (0, chai_1.expect)(res.body.message).to.include('User created successfully');
                (0, chai_1.expect)(res.body.newUser).to.have.property('user_name');
                (0, chai_1.expect)(res.body.newUser).to.have.property('id_user');
                user_id = res.body.newUser.id_user;
                done();
            });
        });
        it('should delete the user from the database', function (done) {
            chai_2.default.request(serverAddress).delete('user/' + user_id).end(function (err, res) {
                (0, chai_1.expect)(err).to.be.null;
                (0, chai_1.expect)(res).to.have.status(200);
                done();
            });
        });
    });
});
