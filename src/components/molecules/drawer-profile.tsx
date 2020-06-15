import React from 'react'
import { useSafeArea } from 'react-native-safe-area-context'

import { ProfileImage } from '@atoms'
import { Text, View } from '@styled'

import { Profile } from '../../api'

interface DrawerProfileProps {
  profile: Profile
}

export const DrawerProfile = ({ profile }: DrawerProfileProps) => {
  const { name, profileImage, username } = profile
  const insets = useSafeArea()

  return (
    <View sx={{ p: 3, pt: insets.top * 1.5 }}>
      <ProfileImage uri={profileImage} size={60} borderRadius={100} />
      <View sx={{ pt: 2 }}>
        <Text sx={{ fontSize: 18, fontWeight: 700 }}>{name}</Text>
        <Text sx={{ fontSize: 16, fontWeight: 300 }}>@{username}</Text>
      </View>
    </View>
  )
}
