import { request } from '../utils/request'
import * as urls from '../utils/urls'
import { renderDate, renderTime } from '../utils/datetime'
import { CacheServiceClass } from './CacheServiceClass'

export interface ArtistWithEventsModel {
  artist: ArtistInfoModel
  events: ArtistEventModel[]
}

export interface ArtistInfoModel {
  name: string
  image_url: string
  facebook_page_url: string
}

export interface ArtistEventModel {
  id: string
  date: string
  time: string
  venue: string
  city: string
  country: string
}

interface ArtistEventResponse {
  id: string
  datetime: string
  venue: ArtistEventVenueResponse
}

interface ArtistEventVenueResponse {
  name: string
  city: string
  country: string
}

const isServer = typeof window === 'undefined'

class ArtistServiceClass {

  cacheService = new CacheServiceClass<ArtistWithEventsModel | null>(isServer)

  async fetchArtistWithEvents(artistName: string) {
    if (this.cacheService.has(artistName)) {
      return this.cacheService.get(artistName)
    }
    const artist = await this.fetchArtistWithEventsImplementation(artistName)
    this.cacheService.set(artistName, artist)
    return artist
  }

  fetchArtistWithEventsImplementation(artistName: string) {
    return isServer
      ? this.serverFetchArtistWithEventsImplementation(artistName)
      : this.clientFetchArtistWithEventsImplementation(artistName)
  }

  async serverFetchArtistWithEventsImplementation(
    artistName: string
  ): Promise<ArtistWithEventsModel | null> {
    const [artist, events] = await Promise.all([
      this.fetchArtist(artistName),
      this.fetchArtistEvents(artistName),
    ])
    if (artist != null && events != null) {
      return { artist, events }
    }
    return null
  }

  async clientFetchArtistWithEventsImplementation(artistName: string) {
    return request<ArtistWithEventsModel>(
      `${window.location.origin}/api/artist/${artistName}`
    )
  }

  async fetchArtist(artistName: string): Promise<ArtistInfoModel | null> {
    return request<ArtistInfoModel>(urls.artistInfo(artistName))
  }

  async fetchArtistEvents(
    artistName: string
  ): Promise<ArtistEventModel[] | null> {
    const events = await request<ArtistEventResponse[]>(
      urls.artistEvents(artistName)
    )
    return events !== null ? this.parseEventsResponse(events) : null
  }

  parseEventsResponse(events: ArtistEventResponse[]) {
    return events.map(eventResponse => {
      const date = new Date(eventResponse.datetime)
      return {
        id: eventResponse.id,
        date: renderDate(date),
        time: renderTime(date),
        venue: eventResponse.venue.name,
        city: eventResponse.venue.city,
        country: eventResponse.venue.country,
      }
    })
  }
}

export const ArtistService = new ArtistServiceClass()
