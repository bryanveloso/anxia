import React from 'react'

import { Image } from '@styled'

interface ProfileImageProps {
  borderRadius?: number
  size?: number
  uri?: string
}

export function ProfileImage(props: ProfileImageProps) {
  const { borderRadius, size = 100, uri } = props
  return <Image source={{ uri }} sx={{ borderRadius, width: size, height: size }} />
}
