// import request from 'supertest';
// const generateSeo = require('../../../services/generate-seo');
// import { app } from '../../../app';

// it('responds with details about the current user', async () => {
//   const cookie = await global.signin();

//   const response = await request(app)
//     .get('/api/user/currentuser')
//     .set('Cookie', cookie)
//     .send()
//     .expect(200);

//   expect(response.body.currentUser.email).toEqual('test@test.com');
// });

// it('responds with null if not authenticated', async () => {
//   const response = await request(app)
//     .get('/api/user/currentuser')
//     .send()
//     .expect(200);

//   expect(response.body.currentUser).toEqual(null);
// });
