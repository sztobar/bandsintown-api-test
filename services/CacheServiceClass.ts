const HOUR = 1000 * 60 * 60
const DAY =  HOUR * 24

interface TimestampRecord<T> {
  timestamp: number
  value: T
}

export class CacheServiceClass<T> {

  _map: Map<string, TimestampRecord<T>> = new Map()
  storageTime: number

  constructor(isServer: boolean) {
    this.storageTime = isServer ? DAY : HOUR
  }

  has(key: string) {
    const record = this._map.get(key)
    if (record) {
      const now = Date.now()
      return (now - record.timestamp) < this.storageTime
    }
    return false
  }

  get(key: string) {
    const record = this._map.get(key)
    return record ? record.value : null
  }

  set(key: string, value: T) {
    this._map.set(key, { timestamp: Date.now(), value })
  }
}