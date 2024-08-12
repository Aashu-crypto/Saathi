import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Route } from '../../routes/router'

import Account from '../../screens/account/Account'
const AccountStack = () => {
    const Stack=createStackNavigator()
  return (
<Stack.Navigator>
    <Stack.Screen name={Route.ACCOUNT} component={Account} />
</Stack.Navigator>
  )
}

export default AccountStack