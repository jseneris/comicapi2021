import request from 'supertest';
const generateSeo = require('../../../services/generate-seo');
import { app } from '../../../app';

it('retrieves information for a publisher', async () => {
  const response = await request(app).get('/api/catalog/publisher').expect(200);
  console.log(response.body[0]);
  expect(response.body[0].name).toEqual('3dtotal Publishing');
  expect(response.body[0].displayOrder).toEqual(1000);
  expect(response.body[0].seoFriendlyName).toEqual('3dtotal-publishing');
});

it('retrieves information for a specific publisher', async () => {
  const response = await request(app)
    .get('/api/catalog/publisher/marvel')
    .expect(200);
  console.log(response.body[0]);
  expect(response.body[0].name).toEqual('3dtotal Publishing');
});
