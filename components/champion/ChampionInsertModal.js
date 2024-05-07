import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const defaultChampionData = {
  champion: 'Champion Name',
  skill: 'A3',
  skill_name: 'Skill Name',
  primary_damage_stat: 'ATK',
  base: '100',
  atk_or_def_buff: '1.5',
  book: '1.25',
  mastery: '1',
  total: '100',
  damage_bonus_from_books: '25',
  damagegrade: 'Godlike',
  target: 'Single Target',
  faction: 'SK',
  rarity: 'L',
  role: 'A',
  affinity: 'M',
};

const ChampionInsertModal = ({ onClose, onInsert }) => {
  const [newChampionData, setNewChampionData] = useState(defaultChampionData);

  const handleChange = (field, value) => {
    setNewChampionData({ ...newChampionData, [field]: value });
  };

  const handleInsert = () => {
    onInsert(newChampionData);
    onClose();
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.heading}>New Champion Data</Text>
      {Object.entries(newChampionData).map(([key, value]) => (
        <View key={key} style={styles.inputContainer}>
          <Text>{key}</Text>
          <TextInput
            style={styles.input}
            value={value.toString()}
            onChangeText={(text) => handleChange(key, text)}
          />
        </View>
      ))}
<View style={{ flexDirection: 'row', justifyContent: 'space-between'} }>
  <Button title="Save" onPress={handleInsert} style={{ marginHorizontal: 10   }} /> 
  <Button title="Cancel" onPress={onClose} style={{ marginHorizontal: 10   }} />
</View>

    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 10,
    paddingHorizontal: 10,
  },
});

export default ChampionInsertModal;
