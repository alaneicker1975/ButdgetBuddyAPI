import request from 'supertest';
import app from '../../index';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;

describe('Auth Endpoints', () => {
  it('Should authenticate user', async () => {
    const res = await request(app).post(`${BASE_URL}/auth`).send({
      username: 'alaneicker',
      password: 'qawsed44',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('token');
  });

  it('Should handle error if invalid user', async () => {
    const res = await request(app).post(`${BASE_URL}/auth`).send({
      username: 'alaneicker',
      password: 'password',
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body.error.code).toBe(401);
    expect(res.body.error.message).toBe('Not Authorized');
  });
});
