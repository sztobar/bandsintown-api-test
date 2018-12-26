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
    async function jsonResolver() {
      return errorObject
    }
    const mockResponse = { status: 200, json: jsonResolver }
    mockFetch.mockResolvedValue(mockResponse)
    const responsePromise = request('')
    return expect(responsePromise).rejects.toBe(errorObject.error)
  })

  it('should reject with string message if request rejects with an error', function() {
    const requestError = new Error('ErrorMessage')
    mockFetch.mockRejectedValue(requestError)
    const responsePromise = request('')
    return expect(responsePromise).rejects.toBe(requestError.message)
  })

  it('should resolve to null if response is an empty string', function() {
    async function jsonResolver() {
      try {
        return JSON.parse('')
      } catch (e) { throw e }
    }
    const mockResponse = { status: 200, json: jsonResolver }
    mockFetch.mockResolvedValue(mockResponse)
    const responsePromise = request('')
    return expect(responsePromise).resolves.toBe(null)
  })

  it('should resolve successfully', function() {
    const response = { response: 'successfull' }
    async function jsonResolver() {
      return response
    }
    const mockResponse = { status: 200, json: jsonResolver }
    mockFetch.mockResolvedValue(mockResponse)
    const responsePromise = request('')
    return expect(responsePromise).resolves.toBe(response)
  })
})