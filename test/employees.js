
const mongoose = require("mongoose");
const employee = require('./../db/employee');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../app');
const should = chai.should();

const employeeDocumentPass = {
    "firstName": "Isa",
    "lastName": "Andrade",
    "participation": 5
};

const employeeDocumentReject = {
    "firstName": "Isa",
    "lastName": "Andrade"
};

chai.use(chaiHttp);

describe('Clients', () => {
    beforeEach((done) => { //Before each test we empty the database
        employee.remove({}, (err) => {
           done();
        });
    });
    afterEach((done)=>{
        employee.remove({}, (err) => {
           done();
        });
    })
    describe('/GET Employees', () => {
        it('it should get all employees registed', (done) => {
            chai.request(server)
            .get('/api/employees')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    })

    describe('/POST Employees', () => {
        it('it should register one employeed', (done) => {
            chai.request(server)
            .post('/api/employees')
            .send(employeeDocumentPass)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
        });
        it('it should fail in registering one employeed', (done) => {
            chai.request(server)
            .post('/api/employees')
            .send(employeeDocumentReject)
            .end((err, res) => {
                res.should.have.status(400);
                //res.body.should.be.a('object');
                done();
            });
        });
    });

  });
