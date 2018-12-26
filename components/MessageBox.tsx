import * as React from 'react'

import '../styles/messageBox.css'

interface MessageBoxProps {
  children?: React.ReactNode
  error?: boolean
}

export function MessageBox(props: MessageBoxProps) {
  return (
    <section className={`message-box ${props.error ? 'message-box--error' : ''}`}>
      <h4>{props.children}</h4>
    </section>
  )
}