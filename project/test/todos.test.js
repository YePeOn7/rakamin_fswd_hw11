const app = require('../app');
const request = require('supertest');
const {sequelize} = require("../models");
const BASE_API_URL = '/api/todos'

const NUMBER_OF_CREATION_LIST = 10

describe("Find Data", () => {
    test('get list', done => {
        request(app)
            .get(`${BASE_API_URL}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                const {body} = response;
                const {data, pageInfo} = body;

                // console.log(body);
                expect(data.length).toBe(10);
                expect(data[0].title).toEqual('Buy groceries');
                expect(pageInfo.current)
                done();
            })
            .catch(done)
    })
    test('get single todo', done => {
        request(app)
            .get(`${BASE_API_URL}/5`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                const {body} = response;

                // console.log(body);

                expect(body.title).toEqual('Workout');
                done();
            })
            .catch(done)
    })
    test('pagination', done => {
        request(app)
            .get(`${BASE_API_URL}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                const {body} = response;
                const {data, pageInfo} = body;

                // console.log(body.pageInfo);
                expect(data.length).toBe(10);
                expect(pageInfo.currentPage).toBe(1);
                expect(pageInfo.nextPage).toBe(2);
                // expect(pageInfo.totalPage).toBe(4);
                done();
            })
            .catch(done)
        
        request(app)
            .get(`${BASE_API_URL}`)
            .query({page: 1, limit: 5})
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                const {body} = response;
                const {data, pageInfo} = body;

                // console.log(body);
                expect(data.length).toBe(5);
                expect(pageInfo.currentPage).toBe(1);
                done();
            })
            .catch(done)
    })
})

describe("Create, Update, and Delete", () => {
    for(let i=0; i < NUMBER_OF_CREATION_LIST; i++){
        test(`Create, Update, and Delete ${i}`, done => {
            // create
            request(app)
                .post(`${BASE_API_URL}`)
                .send({title: `Title Test ${i}`, description: `Description Test ${i}`})
                .expect(201)
                .expect('Content-Type', /json/)
                .then(response => {
                    const {data} = response.body;
    
                    // console.log(body);
                    const currentId = data.id;

                    expect(data.title).toBe(`Title Test ${i}`);
                    expect(data.description).toBe(`Description Test ${i}`);

                    // console.log(`${i} created id: ${currentId}`);

                    //update
                    request(app)
                        .put(`${BASE_API_URL}`)
                        .send({id: currentId, title: `Title Test Update ${i}`, description: `Description Test Update ${i}`})
                        .expect(201)
                        .expect('Content-Type', /json/)
                        .then(response => {
                            const {data} = response.body;
                            const currentId = data.id;

                            expect(data.title).toBe(`Title Test Update ${i}`);
                            expect(data.description).toBe(`Description Test Update ${i}`);
                            // console.log(`${i} updated id: ${currentId}`);
        
                            //delete
                            request(app)
                                .delete(`${BASE_API_URL}`)
                                .send({id: currentId})
                                .expect(201)
                                .expect('Content-Type', /json/)
                                .then(response => {
                                    const {data} = response.body;
                    
                                    expect(data.title).toBe(`Title Test Update ${i}`);
                                    expect(data.description).toBe(`Description Test Update ${i}`);
                    
                                    // console.log(`${i} Deleted id: ${currentId}`);
                                    done()
                                })
                                .catch(done);
                            // done()
                        })
                        .catch(done);
                    // done()
                })
                .catch(done);
        }) 
    }
})