import React, { useContext, useState } from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import ThemeContext from '../ThemeContext'; // Import ThemeContext from the new file 

const SettingsComponent = () => {
  const { toggleTheme } = useContext(ThemeContext);
  

  return (
    <View style={[styles.container]}>
      <Pressable onPress={toggleTheme} style={styles.button}>
        <Text>Toggle Theme</Text>
      </Pressable>

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
