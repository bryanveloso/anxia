import { compose, view, lensPath } from 'ramda'
import React from 'react'
import { Tweet } from 'twitter'

import { Text, View } from '@styled'

interface SingleTweet {
  item: Tweet
}

const nameView = view<SingleTweet, string>(lensPath(['item', 'user', 'name']))
const screenNameView = view<SingleTweet, string>(lensPath(['item', 'user', 'screen_name']))
const textView = view<SingleTweet, string>(lensPath(['item', 'text']))

export const SingleTweet = (props: SingleTweet) => {
  return (
    <View sx={{ px: 3, py: 3 }}>
      <Text sx={{ fontSize: 16 }}>{textView(props)}</Text>
      <View sx={{ pt: 2 }}>
        <Text sx={{ fontWeight: 600 }}>{nameView(props)}</Text>
        <Text sx={{ fontSize: 12 }}>@{screenNameView(props)}</Text>
      </View>
    </View>
  )
}
