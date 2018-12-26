import * as url from 'url'
import { APP_ID, BASE_PATH } from './constants'

export function artistInfo(artistName: string) {
  const href = `${BASE_PATH}/artists/${encodeURIComponent(artistName)}`
  const urlObj = url.parse(href, true)
  urlObj.query = { app_id: APP_ID }
  return url.format(urlObj)
}

export function artistEvents(artistName: string) {
  const href = `${BASE_PATH}/artists/${encodeURIComponent(artistName)}/events`
  const urlObj = url.parse(href, true)
  urlObj.query = { app_id: APP_ID }
  return url.format(urlObj)
}