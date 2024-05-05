import React, { useContext, useState } from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import ThemeContext from '../../ThemeContext'; // Import ThemeContext from the new file 
 
import TextFileParser2 from '../champion/TextFileParser2';

const SettingsComponent = () => {
  const { toggleTheme } = useContext(ThemeContext);
  

  return (
    <View style={[styles.container]}>
      <Pressable onPress={toggleTheme} style={styles.button}>
        <Text>Toggle Theme</Text>
      </Pressable>
      < Text >#################################</Text> 
      < Text >#################################</Text>
      < TextFileParser2></TextFileParser2>
      < Text >#################################</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#DDDDDD',
  },
});

export default SettingsComponent;
