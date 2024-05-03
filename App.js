import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';


import { ThemeProvider } from 'react-native-elements';
import ThemeContext from './ThemeContext'; // Import ThemeContext from the new file
import { FigureDataProvider } from './FigureDataContext'; // Import the FigureDataContext



import SettingsComponent from './components/SettingsComponent';
import FigureComponent from './components/FigureComponent';
import InitComponent from './components/InitComponent';
 

const Tab = createBottomTabNavigator();


export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = isDarkTheme ? DarkTheme : DefaultTheme;

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };





  return (

 
      <FigureDataProvider>
        <ThemeProvider>
          <ThemeContext.Provider value={{ toggleTheme }}>
            <NavigationContainer theme={theme}>
              <Tab.Navigator>
                <Tab.Screen name="Settings" component={SettingsComponent}
                  options={{
                    tabBarIcon: ({  size }) => (
                      <AntDesign name="setting" size={size} />
                    ),
                  }} />
                <Tab.Screen name="Figure" component={FigureComponent}
                  options={{
                    tabBarIcon: ({ size }) => (
                      <AntDesign name="user" size={size} />
                    ),
                    headerRight: () => <InitComponent />, // Render your ButtonGroup component in the header

                  }} />
                <Tab.Screen name="Initialisation"
                  component={InitComponent}
                  options={{
                    tabBarIcon: ({ size }) => (
                      <AntDesign name="database" size={size} />
                    ),
                  }} />
              </Tab.Navigator>
            </NavigationContainer>
          </ThemeContext.Provider>
        </ThemeProvider>
      </FigureDataProvider> 

  );
}
