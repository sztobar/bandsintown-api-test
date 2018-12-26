import * as React from 'react'
import { NextContext } from 'next'
import Router from 'next/router'
import Head from 'next/head'
import { ArtistService, ArtistWithEventsModel } from '../services/ArtistService'
import { ArtistSearch } from './ArtistSearch'
import { ArtistView } from './ArtistView'
import { NoArtistView } from './NoArtistView'
import { ErrorMessage } from './ErrorMessage'
import { LoadingMessage } from './LoadingMessage'

import '../styles/reset.css'
import '../styles/artistPage.css'

interface ArtistPageProps {
  initialArtistName: string
  initialArtist: ArtistWithEventsModel | null
  initialError: string | null
}

interface ArtistPageState {
  artistName: string
  artist: ArtistWithEventsModel | null
  error: string | null
  loading: boolean
}

const isClient = typeof window !== 'undefined';

export class ArtistPage extends React.Component<
  ArtistPageProps,
  ArtistPageState
> {
  static async getInitialProps(nextContext: NextContext) {
    if (isClient) {
      return {}
    }
    if (
      nextContext.query.artistName &&
      typeof nextContext.query.artistName === 'string'
    ) {
      const artistName = nextContext.query.artistName
      try {
        const artist = await ArtistService.fetchArtistWithEvents(artistName)
        return {
          initialArtist: artist,
          initialArtistName: artistName,
          initialError: null,
        }
      } catch (error) {
        return {
          initialArtist: null,
          initialError: error,
          initialArtistName: artistName,
        }
      }
    }
    return {
      initialArtist: null,
      initialArtistName: '',
      initialError: null,
    }
  }

  state: ArtistPageState = {
    artistName: this.props.initialArtistName,
    artist: this.props.initialArtist,
    loading: false,
    error: this.props.initialError,
  }

  deferSetState = <Key extends keyof ArtistPageState>(
    nextState: Pick<ArtistPageState, Key>
  ) => {
    return new Promise(resolve => this.setState(nextState, resolve))
  }

  handleChange = async (artistName: string) => {
    await this.deferSetState({ artistName, error: null, loading: true })
    Router.push({ pathname: Router.pathname, query: { artistName } })
    try {
      const artist = await ArtistService.fetchArtistWithEvents(
        this.state.artistName
      )
      this.setState({ artist, loading: false })
    } catch (error) {
      this.setState({
        loading: false,
        error,
      })
    }
  }

  render() {
    return (
      <main className="artist-page">
        <Head>
          <title>Bands in town API test</title>
        </Head>
        <header className="artist-page__header">
          <h1 className="artist-page__heading">Artist search</h1>
          <span className="artist-page__description">
            Search for your favourite artist and see his/her upcoming events
          </span>
        </header>
        <ArtistSearch
          value={this.state.artistName}
          onChange={this.handleChange}
        />
        {(() => {
          switch (true) {
            case this.state.loading:
              return <LoadingMessage />
            case this.state.error != null:
              return <ErrorMessage error={this.state.error!} />
            case this.state.artist != null:
              return <ArtistView data={this.state.artist!} />
            default:
              return <NoArtistView artistName={this.state.artistName} />
          }
        })()}
      </main>
    )
  }
}

export default ArtistPage
