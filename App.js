import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';


import { ThemeProvider } from 'react-native-elements';
import ThemeContext from './ThemeContext'; // Import ThemeContext from the new file


// setting
import SettingsComponent from './components/settings/SettingsComponent';

// figure
import { FigureDataProvider } from './FigureDataContext'; // Import the FigureDataContext
import FigureComponent from './components/figure/FigureComponent';
import InitComponent from './components/figure/InitComponent';

// champion
import { openChampionDatabase } from './database/ChampionDatabase';
import InitDatabaseComponent from './components/champion/InitDatabaseComponent';
import ChampionComponent from './components/champion/ChampionComponent';
import { initChampionTable } from './database/migrations/initChampionTable'; // Import database functions
import ChampionListComponent from './components/champion/ChampionListComponent';

const Tab = createBottomTabNavigator();


export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = isDarkTheme ? DarkTheme : DefaultTheme;
  const [dbe, setDbe] = useState(null); // State to hold the database instance
  const [dbUpdate, setDbUpdate] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  useEffect(() => {
    openChampionDatabase()
      .then(database => {

        setDbe(database);
        initChampionTable(dbe, false);
      })
      .catch(error => {
        console.error('Error opening database:', error);
      });

  }, []);

  const handleDbUpdate = () => {
    setDbUpdate(prevState => !prevState); // Toggle dbUpdate state to trigger update in ChampionComponent
  };

  return (
    <FigureDataProvider>
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
                name="Figure"
                component={FigureComponent}
                options={{
                  tabBarIcon: ({ size }) => (
                    <AntDesign name="user" size={size} />
                  ),
                  headerRight: () => <InitComponent />, // Render your ButtonGroup component in the header
                }}
              />
              <Tab.Screen
                name="Liste"  
                options={{
                  tabBarIcon: ({ size }) => (
                    <AntDesign name="database" size={size} />
                  ),
                }}
                >
                {() => <ChampionListComponent dbe={dbe} dbUpdate={dbUpdate} />}
              </Tab.Screen>

              <Tab.Screen
                name="Champion"
                options={{
                  tabBarIcon: ({ size }) => (
                    <AntDesign name="piechart" size={size} />
                  ),
                  headerRight: () => <InitDatabaseComponent dbe={dbe} onUpdate={handleDbUpdate} />, // Render your ButtonGroup component in the header

                }}
              >
                {() => <ChampionComponent dbe={dbe} dbUpdate={dbUpdate} />}
              </Tab.Screen>
            </Tab.Navigator>
          </NavigationContainer>
        </ThemeContext.Provider>
      </ThemeProvider>
    </FigureDataProvider>
  );
}
