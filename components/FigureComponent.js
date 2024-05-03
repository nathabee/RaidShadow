import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, Modal, TextInput } from 'react-native';
import FigureDataContext from '../FigureDataContext';

const FigureComponent = () => {
  const { figureData } = useContext(FigureDataContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFigure, setSelectedFigure] = useState(null);

  const handleEditFigure = (figure) => {
    setSelectedFigure(figure);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedFigure(null);
    setModalVisible(false);
  };



  const handleSave = () => {
    // Save the modified figure data
    setModalVisible(false);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Figure Component</Text>
      <ScrollView horizontal={true}>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={styles.columnHeader}>Name</Text>
            <Text style={styles.columnHeader}>Skill</Text>
            <Text style={styles.columnHeader}>Skill Name</Text>
            <Text style={styles.columnHeader}>Primary Damage Stat</Text>
            <Text style={styles.columnHeader}>Base</Text>
            <Text style={styles.columnHeader}>ATK or DEF Buff</Text>
            <Text style={styles.columnHeader}>Book</Text>
            <Text style={styles.columnHeader}>Mastery</Text>
            <Text style={styles.columnHeader}>Total</Text>
            <Text style={styles.columnHeader}>Damage Bonus from Books</Text>
            <Text style={styles.columnHeader}>Damage Grade</Text>
            <Text style={styles.columnHeader}>Target</Text>
            <Text style={styles.columnHeader}>Action</Text>
          </View>
          {figureData.map((figure, index) => (
            <View style={[styles.row, { backgroundColor: getColorBySkill(figure.skill), opacity: getOpacityByDamageGrade(figure.damageGrade) }]} key={index}>
              <Text style={styles.cell}>{figure.name}</Text>
              <Text style={styles.cell}>{figure.skill}</Text>
              <Text style={styles.cell}>{figure.skillName}</Text>
              <Text style={styles.cell}>{figure.primaryDamageStat}</Text>
              <Text style={styles.cell}>{figure.base}</Text>
              <Text style={styles.cell}>{figure.ATKorDEFBuff}</Text>
              <Text style={styles.cell}>{figure.book}</Text>
              <Text style={styles.cell}>{figure.mastery}</Text>
              <Text style={styles.cell}>{figure.total}</Text>
              <Text style={styles.cell}>{figure.damageBonusFromBooks}</Text>
              <Text style={styles.cell}>{figure.damageGrade}</Text>
              <Text style={styles.cell}>{figure.target}</Text>
              <Button title="Edit" onPress={() => handleEditFigure(figure)} />
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Text>Edit Figure: {selectedFigure?.name}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              value={selectedFigure?.name}
              onChangeText={(text) => setSelectedFigure({ ...selectedFigure, name: text })}
            />
            <TextInput
              style={styles.inputField}
              value={selectedFigure?.skill}
              onChangeText={(text) => setSelectedFigure({ ...selectedFigure, skill: text })}
            />
            <TextInput
              style={styles.inputField}
              value={selectedFigure?.skillName}
              onChangeText={(text) => setSelectedFigure({ ...selectedFigure, skillName: text })}
            />
            <TextInput
              style={styles.inputField}
              value={selectedFigure?.primaryDamageStat}
              onChangeText={(text) => setSelectedFigure({ ...selectedFigure, primaryDamageStat: text })}
            />
          </View>

          <View style={styles.buttonContainer}  >
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
    margin: 10,
  },  
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    width: '90%',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    paddingVertical: 10,
  },
  columnHeader: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff', // Change to grey background color if needed
    },
    inputContainer: {
      width: '50%',
      backgroundColor: '#f2f2f2', // Grey background color
      padding: 10,
      margin: 10,
    },
    inputField: {
      backgroundColor: '#fff',
      height: 40,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 10,
    },
  });


// Function to get color based on skill
const getColorBySkill = (skill) => {
  switch (skill) {
    case 'A3':
      return 'blue';
    case 'A4':
      return 'green';
    case 'A2':
      return 'red';
    default:
      return 'gray';
  }
};

// Function to get opacity based on damage grade
const getOpacityByDamageGrade = (damageGrade) => {
  switch (damageGrade) {
    case 'Godlike':
      return 1.0;
    case 'Strong':
      return 0.8;
    case 'Average':
      return 0.6;
    case 'Weak':
      return 0.4;
    default:
      return 0.2;
  }
};



  export default FigureComponent;
