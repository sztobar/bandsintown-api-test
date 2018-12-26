import * as React from 'react'
import { MessageBox } from './MessageBox'

interface NoArtistViewProps {
  artistName: string
}

export function NoArtistView(props: NoArtistViewProps) {
  return (
    <MessageBox>
      {props.artistName
        ? `Cannot find any artist for artist name: "${props.artistName}"`
        : "Enter artist name into input field above and click on search button"}
    </MessageBox>
  )
}