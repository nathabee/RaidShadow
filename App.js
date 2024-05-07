import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';


import { ThemeProvider } from 'react-native-elements';
import ThemeContext from './ThemeContext'; // Import ThemeContext from the new file


// setting
import SettingsComponent from './components/settings/SettingsComponent';


// champion
import { ChampionDataProvider } from './ChampionDataContext'; // Import the FigureDataContext 
import ChampionComponent from './components/champion/ChampionComponent';


// init database 
// import { openChampionDatabase  } from './database/ChampionDatabase'; // Import database functions
// import displayErrorToast from './utils/DisplayErrorToast'; // Assuming utils.js contains the displayErrorToast function
// import { initChampionTable } from './database/migrations/initChampionTable'; // Import database functions
import InitDatabaseComponent from './components/champion/InitDatabaseComponent';
  



const Tab = createBottomTabNavigator();



export default function App() {

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = isDarkTheme ? DarkTheme : DefaultTheme;


  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };





  return ( 
   
   <ChampionDataProvider  >
      <ThemeProvider>
        <ThemeContext.Provider value={{ toggleTheme }}>
          <NavigationContainer theme={theme}>
            <Tab.Navigator>
              <Tab.Screen
                name="Settings"
                component={SettingsComponent}
                options={{
                  tabBarIcon: ({ size }) => (
                    <AntDesign name="setting" size={size} />
                  ),
                }}
              />
              <Tab.Screen
                name="Initialisation"
                options={{
                  tabBarIcon: ({ size }) => (
                    <AntDesign name="database" size={size} />
                  ),
                }}
              >
                {() => <InitDatabaseComponent />}
              </Tab.Screen>

              <Tab.Screen
                name="Champion"
                options={{
                  tabBarIcon: ({ size }) => (
                    <AntDesign name="piechart" size={size} />
                  ),
                  //headerRight: () => <InitDatabaseComponent  />, // Render your ButtonGroup component in the header 

                }}
              >
                {/*() => <ChampionComponent db={db} dbUpdate={dbUpdate} /> */}
                {() => <ChampionComponent />}
              </Tab.Screen>
            </Tab.Navigator>
          </NavigationContainer>
        </ThemeContext.Provider>
      </ThemeProvider>
    </ChampionDataProvider>
  );
}
