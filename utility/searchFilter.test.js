const searchFilter = require('./searchFilter')

const mockSearchReuslts = [
  {description: 'abc def', body: 'number 1'},
  {description: 'eee aaa', body: 'number 2'},
  {description: 'abc def', body: 'number 3'},
  {description: 'eee aaa', body: 'number 4'},
  {description: 'abc def', body: 'number 5'},
  {description: 'eee aaa', body: 'number 6'},
  {description: 'abc def', body: 'number 7'},
  {description: 'eee aaa', body: 'number 8'},
  {description: 'abc def', body: 'number 9'},
  {description: 'eee aaa', body: 'number 10'},
  {description: 'abc def', body: 'number 11'},
  {description: 'eee aaa', body: 'number 12'},
]

const mockUserId = 0;

const mockConnection = {query: jest.fn()}

describe('Testing filtering function', () => {
  beforeEach(() => {
    mockConnection.query.mockClear();
  })
  test('more than 10 matches', () => {
    const mockFilterKeywords = ['abc', 'def', 'eee', 'aaa']
    const data = searchFilter(mockConnection, mockSearchReuslts, mockFilterKeywords, mockUserId)
    expect(data.filteredResults.length).toBe(10)
    expect(data.filterSuccess).toBe(true)
    expect(mockConnection.query.mock.calls.length).toBe(1);
  })
  test('only 6 matches', () => {
    const mockFilterKeywords = ['abc', 'def']
    const data = searchFilter(mockConnection, mockSearchReuslts, mockFilterKeywords, mockUserId)
    expect(data.filteredResults.length).toBe(6)
    expect(data.filterSuccess).toBe(true)
    expect(mockConnection.query.mock.calls.length).toBe(0);
  })
  test('with 0 match', () => {
    const mockFilterKeywords = ['haha', 'fail']
    const data = searchFilter(mockConnection, mockSearchReuslts, mockFilterKeywords, mockUserId)
    expect(data.filteredResults.length).toBe(10)
    expect(data.filterSuccess).toBe(false)
    expect(mockConnection.query.mock.calls.length).toBe(1);
  })
})