
import request from 'supertest';
import {app} from '../../src'; 

describe('Auth Integration Tests', () => {
  let mobile: string;
  let email: string;
  let password: string;

  beforeAll(() => {
    mobile = '+1234567890';
    email = 'user@example.com';
    password = 'securepassword';
  });

  it('should successfully sign up a new user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        mobile,
        email,
        password,
        name: 'John Doe',
      })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      error: false,
      message: expect.stringContaining('signup successful'),
      data: null,
    });
  });

  it('should verify the signup with a code', async () => {
    const verificationCode = '44397988';

    const response = await request(app)
      .post('/api/v1/auth/signup/verify')
      .send({
        mobile,
        code: verificationCode,
      })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      error: false,
      message: 'Account verified successfully',
      data: null,
    });
  });
});