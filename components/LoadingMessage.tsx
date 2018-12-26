import * as React from 'react'
import { MessageBox } from './MessageBox'

interface LoadingMessageProps {
}

export function LoadingMessage(props: LoadingMessageProps) {
  return (
    <MessageBox>
      Loading data, please wait a moment
    </MessageBox>
  )
}