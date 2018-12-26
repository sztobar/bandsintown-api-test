import * as React from 'react'
import { ArtistWithEventsModel } from '../services/ArtistService'

import '../styles/artistView.css'

interface ArtistViewProps {
  data: ArtistWithEventsModel
}

export function ArtistView(props: ArtistViewProps) {
  const { artist, events } = props.data
  return (
    <section className="artist-view">
      <h2 className="artist-view__title">Artist info:</h2>
      <article className="artist-view__info">
        <figure className="artist-view__figure">
          <img className="artist-view__image" src={artist.image_url} alt={artist.name + ' image'} />
        </figure>
        <h3 className="artist-view__name">{artist.name}</h3>
        <p className="artist-view__facebook">
          {artist.facebook_page_url
            ? (
              <a className="artist-view__link" href={artist.facebook_page_url} target="_blank" rel="noopener noreferrer">{artist.facebook_page_url}</a>
            ) : (
              <span className="artist-view__no-link-message">No facebook page url</span>
            )}
        </p>
      </article>
      <ul className="artist-view__events">
        {events.map(event => (
          <li className="artist-event" key={event.id}>
            <p className="artist-event__where">
              <span className="artist-event__label">Where:</span>
              <span className="artist-event__content">
                {event.country}, {event.city}
              </span>
            </p>
            <p className="artist-event__venue">
              <span className="artist-event__label">Venue:</span>
              <span className="artist-event__content">
                {event.venue}
              </span>
            </p>
            <p className="artist-event__date">
              <span className="artist-event__label">Date:</span>
              <span className="artist-event__content">
                {event.date}
              </span>
            </p>
            <p className="artist-event__time">
              <span className="artist-event__label">Time:</span>
              <span className="artist-event__content">
                {event.time}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
