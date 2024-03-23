const app = require('../app');
const request = require('supertest');
const {sequelize} = require("../models");
const BASE_API_URL = '/api/todos'

describe("Find Data", () => {
    test('test get', done => {
        request(app)
            .get(`${BASE_API_URL}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                const {body} = response;
                const {data, pageInfo} = body;

                expect(data.length).toBeGreaterThan(0);
                done();
            })
            .catch(err => {
                done(err);
            })
    })
})