// App.js
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './navigation/appNavigator'
import { Provider } from 'react-redux'
import { store } from './redux/store'; 
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  return (
    <Provider store = {store}>
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
    
  )
}
