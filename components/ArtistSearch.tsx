import * as React from 'react'

import '../styles/artistSearch.css'

interface ArtistSearchProps {
  onChange(value: string): any
  value: string
}

interface ArtistSearchState {
  propsValue: string
  value: string
}

export class ArtistSearch extends React.Component<
  ArtistSearchProps,
  ArtistSearchState
> {
  static getDerivedStateFromProps(props: ArtistSearchProps, state: ArtistSearchState) {
    const propsValueChanged = props.value !== state.propsValue
    return {
      value: propsValueChanged ? props.value : state.value,
      propsValue: propsValueChanged ? props.value : state.propsValue,
    }
  }

  state = {
    propsValue: this.props.value,
    value: this.props.value,
  }

  handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value
    this.setState({ value })
  }

  handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    this.props.onChange(this.state.value)
  }

  render() {
    return (
      <form className="artist-search" onSubmit={this.handleSubmit}>
        <label className="artist-search__label">
          <input
            className="artist-search__input"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Type in artist name"
          />
        </label>
        <button className="artist-search__submit" type="submit">
          search
        </button>
      </form>
    )
  }
}
