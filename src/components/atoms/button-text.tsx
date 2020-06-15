import React from 'react'

import { Text } from '@styled'

interface ButtonTextProps {
  color: string
  text: string
}

export function ButtonText(props: ButtonTextProps) {
  return (
    <Text
      sx={{
        color: props.color,
        fontSize: 16,
        fontWeight: 700,
      }}>
      {props.text}
    </Text>
  )
}
