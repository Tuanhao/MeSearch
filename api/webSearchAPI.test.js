const webSearchAPI = require('./webSearchAPI')

jest.setTimeout(10000)

describe('Testing contextual web search API', () => {
  test('successfully receive data', async () => {
    const data = await webSearchAPI.search('Carleton University')
    expect(data.statusCode).toBe(200)
  })
  test('error on the API server - wrong credentials', async () => {
    // await expect(webSearchAPI.search('Carleton University', 'test')).toThrow()
    try {
      await webSearchAPI.search('Carleton University', 'test')
    } catch (e) {
      expect(e.message).toBe('Error: got 401 response')
    }
  })
})