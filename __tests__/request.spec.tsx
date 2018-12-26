import fetch from 'node-fetch'
import { request } from '../utils/request'

jest.mock('node-fetch')

const mockFetch = fetch as jest.Mock<typeof fetch>;

describe('request function', function() {
  it('should reject if response status is less than 200', function() {
    const mockResponse = { status: 199 }
    mockFetch.mockResolvedValue(mockResponse)
    const responsePromise = request('')
    return expect(responsePromise).rejects.toBe('Unidentified error occured, try to refersh the page')
  })

  it('should reject if response status is greater or equal 300', function() {
    const mockResponse = { status: 300 }
    mockFetch.mockResolvedValue(mockResponse)
    const responsePromise = request('')
    return expect(responsePromise).rejects.toBe('Unidentified error occured, try to refersh the page')
  })

  it('should reject with message if response contains error property', function() {
    const errorObject = {error: 'error'}
    function textResolver() {
      return JSON.stringify(errorObject)
    }
    const mockResponse = { status: 200, text: textResolver }
    mockFetch.mockResolvedValue(mockResponse)
    const responsePromise = request('')
    return expect(responsePromise).rejects.toBe(errorObject.error)
  })

  it('should reject with string message if request resolves with a string', function() {
    const requestError = 'ErrorMessage'
    mockFetch.mockRejectedValue(requestError)
    const responsePromise = request('')
    return expect(responsePromise).rejects.toBe(requestError)
  })

  it('should resolve successfully', function() {
    const response = { response: 'successfull' }
    function textResolver() {
      return JSON.stringify(response)
    }
    const mockResponse = { status: 200, text: textResolver }
    mockFetch.mockResolvedValue(mockResponse)
    const responsePromise = request('')
    return expect(responsePromise).resolves.toEqual(response)
  })
})