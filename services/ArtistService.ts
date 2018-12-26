import { request } from '../utils/request'
import * as urls from '../utils/urls'
import { renderDate, renderTime } from '../utils/datetime'

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

class ArtistServiceClass {

  async fetchArtistWithEvents(
    artistName: string
  ): Promise<ArtistWithEventsModel | null> {
    const [artist, events] = await Promise.all([
      this.fetchArtist(artistName),
      this.fetchArtistEvents(artistName),
    ])
    if (artist !== null && events !== null) {
      return { artist, events }
    }
    return null
  }

  async fetchArtist(artistName: string): Promise<ArtistInfoModel | null> {
    return request<ArtistInfoModel>(urls.artistInfo(artistName))
  }

  async fetchArtistEvents(artistName: string): Promise<ArtistEventModel[] | null> {
    const events = await request<ArtistEventResponse[]>(urls.artistEvents(artistName))
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
