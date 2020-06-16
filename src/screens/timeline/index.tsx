import { createSelector } from '@reduxjs/toolkit'
import bigInt from 'big-integer'
import { compose, lensIndex, view, prop } from 'ramda'
import React, { useEffect, useCallback } from 'react'
import { Button, View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { Tweet } from 'twitter'

import { Timeline } from '@organisms'
import { RootState, useAppDispatch } from '@store'
import { getTimeline } from '@store/timeline'
import { TIMELINE_REQUEST_TYPE } from '@utils/enum'
import { useFetch } from '@utils/hooks'

const getId = prop('id_str')
const getMaxId = compose(
  (v: string) => bigInt(v).subtract(1).toString(),
  getId,
  view<Tweet[], Tweet>(lensIndex(-1)),
)
const getSinceId = compose(getId, view<Tweet[], Tweet>(lensIndex(0)))

type TimelineResult = {
  max_id: string
  since_id: string
  data: Tweet[]
  pending: boolean
}

const DATA = [
  {
    id_str: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id_str: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id_str: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
]

const timelineSelector = (state: RootState) => state.timeline
const fetchTimelineSelector = createSelector(timelineSelector, (state) => ({
  pending: state.pending,
  data: state.data,
  max_id: getMaxId(state.data),
  since_id: getSinceId(state.data),
}))

export default function TimelineScreen({ navigation }) {
  const dispatch = useAppDispatch()
  const result = useSelector((state) => fetchTimelineSelector(state))
  console.log('result.length', result)

  useEffect(() => {
    if (result.data.length === 0) {
      dispatch(getTimeline({ type: TIMELINE_REQUEST_TYPE.TOP }))
    }
  }, [])

  const handleRefresh = useCallback(() => {
    console.log('handleRefresh', result.since_id)
    fetch({
      type: TIMELINE_REQUEST_TYPE.TOP,
      since_id: result.since_id,
    })
  }, [result.since_id])

  const handleEndReached = useCallback(() => {
    console.log('handleEndReached', result.max_id)
    fetch({
      type: TIMELINE_REQUEST_TYPE.BOTTOM,
      max_id: result.max_id,
    })
  }, [result.max_id])

  return (
    <View>
      <Timeline
        data={result.data}
        // onRefresh={handleRefresh}
        onEndReached={handleEndReached}
        // refreshing={pending}
      />
    </View>
  )
}
