const request = require('supertest')
const app = require('../src')
describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        title: 'test is cool',
      })

    const desiredResult = {
      id: expect.stringMatching(/[a-zA-z0-9]{8}/),
      title: 'test is cool',
    }
    expect(res.statusCode).toEqual(201)
    expect(res.body).toMatchObject(desiredResult);
  })
})
