const request = require('supertest');
const app = require('../src/app');

describe('API Test', () => {

  test('GET / debería responder correctamente', async () => {

    const res = await request(app).get('/');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("API funcionando correctamente 🚀");

  });

});