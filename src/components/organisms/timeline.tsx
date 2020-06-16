import React from 'react'
import { FlatList, Text } from 'react-native'
import { Tweet } from 'twitter'

import { SingleTweet } from '@organisms'

interface TimelineProps {
  data: Tweet[]
  onRefresh: () => void
  onEndReached: (info: { distanceFromEnd: number }) => void
  refreshing: boolean
}

export const Timeline = (props: TimelineProps) => {
  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => <SingleTweet item={item} />}
      keyExtractor={(item) => item.id_str}
      // onRefresh={props.onRefresh}
      onEndReached={props.onEndReached}
      // refreshing={props.refreshing}
    />
  )
}
