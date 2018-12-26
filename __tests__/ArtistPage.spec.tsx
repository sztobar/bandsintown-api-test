import * as React from 'react'
import { shallow } from 'enzyme'
import ArtistPage from '../components/ArtistPage'
import { ArtistWithEventsModel } from '../services/ArtistService'

describe('<ArtistPage/>', function () {

  it('should fill state with inital values from props', function () {
    const initialArtist = {} as any as ArtistWithEventsModel
    const initialArtistName = 'initialArtistName'
    const wrap = shallow<ArtistPage>(<ArtistPage initialArtist={initialArtist} initialArtistName={initialArtistName} />)
    expect(wrap.state()).toMatchObject({ artist: initialArtist, artistName: initialArtistName })
  })

  it('should have updated state after deferSetState', async function () {
    const wrap = shallow<ArtistPage>(<ArtistPage initialArtist={null} initialArtistName="" />)
    const stateArtistName = 'stateArtistName'
    await wrap.instance().deferSetState({ artistName: stateArtistName })
    expect(wrap.state().artistName).toBe(stateArtistName)
  })

})