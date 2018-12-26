import * as React from 'react'
import { shallow } from 'enzyme'
import ArtistPage from '../components/ArtistPage'
import { ArtistWithEventsModel } from '../services/ArtistService'

describe('<ArtistPage/>', function () {

  it('should fill state with inital values from props', function () {
    const initialArtist = {} as any as ArtistWithEventsModel
    const initialArtistName = 'initialArtistName'
    const initialError = 'initialError'
    const wrap = shallow<ArtistPage>(<ArtistPage initialArtist={initialArtist} initialArtistName={initialArtistName} initialError={initialError} />)
    expect(wrap.state()).toMatchObject({ artist: initialArtist, artistName: initialArtistName, error: 'initialError' })
  })

  it('should have updated state after deferSetState', async function () {
    const wrap = shallow<ArtistPage>(<ArtistPage initialArtist={null} initialArtistName="" initialError={null} />)
    const stateArtistName = 'stateArtistName'
    await wrap.instance().deferSetState({ artistName: stateArtistName })
    expect(wrap.state().artistName).toBe(stateArtistName)
  })

})