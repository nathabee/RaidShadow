import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const ButtonGroup = ({ onReset, onDeleteAll, onImport }) => {
  return (
    <View style={styles.container}>
      <Button title="Reset" onPress={onReset} />
      <Button title="Delete All" onPress={onDeleteAll} />
      <Button title="Import CSV" onPress={onImport} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default ButtonGroup;
