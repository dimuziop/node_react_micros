const request = require('supertest')
const app = require('../src')
describe('Comments Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/posts/55/comments')
      .send({
        content: 'test is cool',
      })

    const desiredResult = [{
      id: expect.stringMatching(/[a-zA-z0-9]{8}/),
      content: 'test is cool',
    }]
    expect(res.statusCode).toEqual(201)
    expect(res.body).toMatchObject(desiredResult);
  }),
    it('should receive an empty posts object', async () => {
      const res = await request(app)
        .get('/posts/55/comments').send()

      const desiredResult = {}

      expect(res.statusCode).toEqual(200)
      expect(res.body).toMatchObject(desiredResult);
    })
})
