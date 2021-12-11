import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../src/app';

const user = {
  email: 'juku@juurikas.ee',
  password: 'juku',
};

let token: string;
let excuseId: number;

describe('Excuses controller', () => {
  describe('GET /excuses', () => {
    it('responds with code 200 and token after login', async () => {
      const response = await request(app)
        .post('/login')
        .send(user);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('token');
      expect(response.body.token).to.be.a('string');
      token = response.body.token;
    });
    it('responds with code 401 and error message because of no token provided', async () => {
      const response = await request(app).get('/excuses');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('No token provided');
    });
    it('responds with code 401 and error message because of invalid token', async () => {
      const response = await request(app)
        .get('/excuses')
        .set('Authorization', 'Bearer ölkxjdkljdglkjdgöljeöotuiöjkvlnvösodhg');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.equal('Invalid token');
    });
    it('responds with code 200 and array of excuses', async () => {
      const response = await request(app)
        .get('/excuses')
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.key('excuses');
      expect(response.body.excuses).to.be.a('array');
      expect(response.body.excuses.length).to.greaterThan(0);
    });
  });
  describe('POST /excuses', () => {
    it('responds with code 400 and error message because of missing description', async () => {
      const response = await request(app)
        .post('/excuses')
        .set('Authorization', `Bearer ${token}`)
        .send({
          category: 1,
          visibility: 'Public',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.key('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.equal('Excuse description is required');
    });
    it('responds with code 201 and id of new excuse', async () => {
      const response = await request(app)
        .post('/excuses')
        .set('Authorization', `Bearer ${token}`)
        .send({
          category: 1,
          visibility: 'Public',
          description: 'Tsikipriki',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(201);
      expect(response.body).to.have.key('id');
      expect(response.body.id).to.be.a('number');
      excuseId = response.body.id;
    });
  });
  describe('DELETE /excuses/:id', () => {
    it('responds with code 204 and empty object', async () => {
      const response = await request(app)
        .delete(`/excuses/${excuseId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(204);
    });
  });
});
