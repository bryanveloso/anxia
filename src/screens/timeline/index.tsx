import React, { useEffect } from 'react'
import { Button, View, Text } from 'react-native'
import { useSelector } from 'react-redux'

import { RootState, useAppDispatch } from '@store'
import { AccessTokenState } from '@store/auth'
import { getHomeTimeline } from '@store/timeline'

export default function TimelineScreen({ navigation }) {
  const dispatch = useAppDispatch()
  const hasAccessToken = useSelector((state: RootState) => state.auth.accessToken) === AccessTokenState.Found
  const timeline = useSelector((state: RootState) => state.auth.username)
  console.log(timeline)

  useEffect(() => {
    dispatch(getHomeTimeline())
  }, [hasAccessToken])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Timeline Screen</Text>
      <Button onPress={() => navigation.navigate('Detail')} title="Detail Screen" />
    </View>
  )
}
