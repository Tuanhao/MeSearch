const searchFilter = require('./searchFilter')

const mockSearchReuslts = [
  {description: 'abc def'},
  {description: 'eee aaa'},
  {description: 'abc def'},
  {description: 'eee aaa'},
  {description: 'abc def'},
  {description: 'eee aaa'},
  {description: 'abc def'},
  {description: 'eee aaa'},
  {description: 'abc def'},
  {description: 'eee aaa'},
  {description: 'abc def'},
  {description: 'eee aaa'},
]

const mockFilterKeywords = ['abc', 'def', 'eee', 'aaa']

const mockUserId = 0;

const mockConnection = {query: jest.fn()}

describe('Testing filtering function', () => {
  test('more than 10 matches', () => {
    
  })
})