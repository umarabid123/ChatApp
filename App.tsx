/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import StackNavigator from './navigation/StackNavigator';

function App(): React.JSX.Element {
  return (
   <AuthProvider>
     <StackNavigator />
   </AuthProvider>
  );
}
export default App;
