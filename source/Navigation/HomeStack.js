import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Home';
const Stack = createNativeStackNavigator();

/* Home stack to contain all the user screens after authentication. 
Right now contains one screen: the home screen */

function HomeStack() {
  return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
  );
}
export default HomeStack;