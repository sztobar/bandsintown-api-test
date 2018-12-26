import { CacheServiceClass } from '../services/CacheServiceClass'

const HOUR = 1000 * 60 * 60
const DAY = HOUR * 24

describe('CacheServiceClass', function() {
  describe('for server-side', function() {
    const isServer = true

    it('should not remember records older than 1 day', function() {
      const cacheService = new CacheServiceClass(isServer)
      cacheService.set('key', 'value')
      const now = Date.now()
      Date.now = jest.fn(() => now + DAY + 1)
      expect(cacheService.has('key')).toBe(false)
    })

    it('should not remember records younger than 1 day', function() {
      const cacheService = new CacheServiceClass(isServer)
      cacheService.set('key', 'value')
      expect(cacheService.has('key')).toBe(true)
    })

    it('should return values without timestamps', function() {
      const cacheService = new CacheServiceClass(isServer)
      cacheService.set('key', 'value')
      expect(cacheService.get('key')).toBe('value')
    })
  })

  describe('for client-side', function() {
    const isServer = false

    it('should not remember records older than 1 hour', function() {
      const cacheService = new CacheServiceClass(isServer)
      cacheService.set('key', 'value')
      const now = Date.now()
      Date.now = jest.fn(() => now + HOUR + 1)
      expect(cacheService.has('key')).toBe(false)
    })

    it('should not remember records younger than 1 hour', function() {
      const cacheService = new CacheServiceClass(isServer)
      cacheService.set('key', 'value')
      expect(cacheService.has('key')).toBe(true)
    })

    it('should return values without timestamps', function() {
      const cacheService = new CacheServiceClass(isServer)
      cacheService.set('key', 'value')
      expect(cacheService.get('key')).toBe('value')
    })
  })
})
