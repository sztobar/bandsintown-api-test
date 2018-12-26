import * as React from 'react'
import { MessageBox } from './MessageBox'

interface ErrorMessageProps {
  error: string
}

export function ErrorMessage(props: ErrorMessageProps) {
  return (
    <MessageBox error>
      {props.error}
    </MessageBox>
  )
}