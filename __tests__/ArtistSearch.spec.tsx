import * as React from 'react'
import { mount } from 'enzyme'
import { ArtistSearch } from '../components/ArtistSearch'

function noop() { }

describe('<ArtistSearch/>', function () {

  it('should have initial state value equal to props value', function () {
    const propsValue = "propsValue"
    const wrap = mount<ArtistSearch>(<ArtistSearch value={propsValue} onChange={noop} />)
    expect(wrap.state().value).toEqual(propsValue)
  })

  it('should update state value when props value change', function () {
    const initialPropsValue = "initialPropsValue"
    const wrap = mount<ArtistSearch>(<ArtistSearch value={initialPropsValue} onChange={noop} />)
    const changedPropsValue = "changedPropsValue"
    wrap.setProps({ value: changedPropsValue })
    expect(wrap.state().value).toEqual(changedPropsValue)
  })

  it('should have different state value if state changes and props do not', function () {
    const propsValue = "propsValue"
    const wrap = mount<ArtistSearch>(<ArtistSearch value={propsValue} onChange={noop} />)
    const stateValue = "stateValue"
    wrap.setState({ value: stateValue })
    expect(wrap.state().value).toEqual(stateValue)
  })

  it('should update state value if input value changes', function () {
    const propsValue = "propsValue"
    const wrap = mount<ArtistSearch>(<ArtistSearch value={propsValue} onChange={noop} />)
    const stateValue = "stateValue"
    wrap.find('input').simulate('change', { target: { value: stateValue }})
    expect(wrap.state().value).toEqual(stateValue)
  })

  it('should call preventDefault on event argument when form is submitted', function() {
    const wrap = mount<ArtistSearch>(<ArtistSearch value="" onChange={noop} />)
    const eventMock = { preventDefault: jest.fn() } as any as React.FormEvent<HTMLFormElement>
    wrap.find('form').simulate('submit', eventMock)
    expect(eventMock.preventDefault).toBeCalled()
  })

  it('should call onChange callback with its state when form is submitted', function() {
    const onChange = jest.fn()
    const wrap = mount<ArtistSearch>(<ArtistSearch value="" onChange={onChange} />)
    const stateValue = "stateValue"
    wrap.setState({ value: stateValue })
    wrap.find('form').simulate('submit')
    expect(onChange).toBeCalledWith(stateValue)
  })
})