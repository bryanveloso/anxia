import React from 'react'
import { useSafeArea } from 'react-native-safe-area-context'
import { FullUser } from 'twitter-d'

import { ProfileImage } from '@atoms'
import { Text, View } from '@styled'

interface DrawerProps {
  profile: FullUser
}

export const DrawerProfile = (props: DrawerProps) => {
  const { name, profile_image_url_https, screen_name } = props.profile
  const profileImage = profile_image_url_https.replace('_normal', '')
  const insets = useSafeArea()

  return (
    <View sx={{ p: 3, pt: insets.top * 1.5 }}>
      <ProfileImage uri={profileImage} size={64} borderRadius={100} />
      <View sx={{ pt: 2 }}>
        <Text sx={{ fontSize: 18, fontWeight: 700 }}>{name}</Text>
        <Text sx={{ fontSize: 16, fontWeight: 300 }}>@{screen_name}</Text>
      </View>
    </View>
  )
}
