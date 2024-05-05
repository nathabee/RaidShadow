import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import InitFigureCSVComponent from './InitFigureCSVComponent';

const FigureCSVComponent = () => {
  const [figures, setFigures] = useState([]);
  const [showInitFigureCSV, setShowInitFigureCSV] = useState(false); // Add state for controlling visibility

  const handleFileSelect = (data) => {
    // Here you can process the parsed CSV data and set it to state
    setFigures(data);
  };

  return (
    <View>

      <Button title="Read from File" onPress={() => setShowInitFigureCSV(true)} />
      {figures.length > 0 ? (
        <View>
          {figures.map((figure, index) => (
            <View key={index}>
              <Text>Name: {figure.name}</Text>
              <Text>Skill: {figure.skill}</Text>
              <Text>Skill Name: {figure.skillName}</Text>
              <Text>Primary Damage Stat: {figure.primaryDamageStat}</Text>
              <Text>Base: {figure.base}</Text>
              <Text>ATK or DEF Buff: {figure.ATKorDEFBuff}</Text>
              <Text>Book: {figure.book}</Text>
              <Text>Mastery: {figure.mastery}</Text>
              <Text>Total: {figure.total}</Text>
              <Text>Damage Bonus from Books: {figure.damageBonusFromBooks}</Text>
              <Text>Damage Grade: {figure.damageGrade}</Text>
              <Text>Target: {figure.target}</Text>
            </View>

          ))}
        </View>
      ) : null
      }
      <View>
        {showInitFigureCSV && <InitFigureCSVComponent onFileSelect={handleFileSelect} />}
      </View>
    </View >
  );
};


export default FigureCSVComponent;
