// In App.js in a new project

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './HomeStack';
const Stack = createNativeStackNavigator();

/* master stack that nests all other navigators like the home stack, auth stack. */

function MasterStack() {
  return (
    
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>
    
  );
}

export default MasterStack;