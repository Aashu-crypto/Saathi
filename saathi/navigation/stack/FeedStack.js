import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Route } from '../../routes/router'
import Feed from '../../screens/feed/Feed'
const FeedStack = () => {
    const Stack=createStackNavigator()
  return (
<Stack.Navigator>
    <Stack.Screen name={Route.FEED} component={Feed} />
</Stack.Navigator>
  )
}

export default FeedStack