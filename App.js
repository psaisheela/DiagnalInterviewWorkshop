import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MasterStack from './source/Navigation/MasterStack';

export default function App() {
  
  return (
    <NavigationContainer>
      <MasterStack/>
    </NavigationContainer>
  );
}