import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, Modal, TextInput } from 'react-native';
import FigureDataContext from '../FigureDataContext';

const FigureComponent = () => {
  const { figureData } = useContext(FigureDataContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFigure, setSelectedFigure] = useState(null);

  //####################################
  const [searchName, setSearchName] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filteredFigures, setFilteredFigures] = useState([]);

  // Function to fetch figures based on search criteria
  const handleSearch = async () => {
    try {
      const filtered = figureData.filter(figure => (
        figure.name.toLowerCase().includes(searchName.toLowerCase())
      ));
  
      // Slice the filtered array to get only the first 20 items
      const limitedFiltered = filtered.slice(0, 20);
  
      setFilteredFigures(limitedFiltered); // Update the state with filtered figures
    } catch (error) {
      console.error('Error searching figures:', error);
    }
  };
  

  //####################################

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

    <ScrollView style={styles.container}>
    <Text style={styles.title}>Figure Component</Text>
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.inputField}
        value={searchName}
        placeholder="Search by name"
        onChangeText={(text) => setSearchName(text)}
      />
      {/* Add your combobox component here */}
      <TextInput
        style={styles.inputField}
        value={searchValue}
        placeholder="Search by value"
        onChangeText={(text) => setSearchValue(text)}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
    <ScrollView horizontal={true}>
      <View style={styles.table}>
        <View style={styles.headerRow}>
            <Text style={[styles.columnHeader, styles.column1]}>Name</Text>
            <Text style={[styles.columnHeader, styles.column2]}>Skill</Text>
            <Text style={[styles.columnHeader, styles.column3]}>Skill Name</Text>
            <Text style={[styles.columnHeader, styles.column4]}>Primary Damage Stat</Text>
            <Text style={[styles.columnHeader, styles.column5]}>Base</Text>
            <Text style={[styles.columnHeader, styles.column6]}>ATK or DEF Buff</Text>
            <Text style={[styles.columnHeader, styles.column7]}>Book</Text>
            <Text style={[styles.columnHeader, styles.column8]}>Mastery</Text>
            <Text style={[styles.columnHeader, styles.column9]}>Total</Text>
            <Text style={[styles.columnHeader, styles.column10]}>Damage Bonus from Books</Text>
            <Text style={[styles.columnHeader, styles.column11]}>Damage Grade</Text>
            <Text style={[styles.columnHeader, styles.column12]}>Target</Text>
            <Text style={[styles.columnHeader, styles.column13]}>faction</Text>
            <Text style={[styles.columnHeader, styles.column14]}>rarity</Text>
            <Text style={[styles.columnHeader, styles.column15]}>role</Text>
            <Text style={[styles.columnHeader, styles.column16]}>affinity</Text>
            <Text style={[styles.columnHeader, styles.column17]}>Action</Text>
          </View>
          {filteredFigures.map((figure, index) => (
            <View style={[styles.row, { backgroundColor: getColorBySkill(figure.skill), opacity: getOpacityByDamageGrade(figure.damageGrade) }]} key={index}>
              <Text style={[styles.cell, styles.column1]}>{figure.name}</Text>
              <Text style={[styles.cell, styles.column2]}>{figure.skill}</Text>
              <Text style={[styles.cell, styles.column3]}>{figure.skillName}</Text>
              <Text style={[styles.cell, styles.column4]}>{figure.primaryDamageStat}</Text>
              <Text style={[styles.cell, styles.column5]}>{figure.base}</Text>
              <Text style={[styles.cell, styles.column6]}>{figure.ATKorDEFBuff}</Text>
              <Text style={[styles.cell, styles.column7]}>{figure.book}</Text>
              <Text style={[styles.cell, styles.column8]}>{figure.mastery}</Text>
              <Text style={[styles.cell, styles.column9]}>{figure.total}</Text>
              <Text style={[styles.cell, styles.column10]}>{figure.damageBonusFromBooks}</Text>
              <Text style={[styles.cell, styles.column11]}>{figure.damageGrade}</Text>
              <Text style={[styles.cell, styles.column12]}>{figure.target}</Text>
              <Text style={[styles.cell, styles.column13]}>{figure.faction}</Text>
              <Text style={[styles.cell, styles.column14]}>{figure.rarity}</Text>
              <Text style={[styles.cell, styles.column15]}>{figure.role}</Text>
              <Text style={[styles.cell, styles.column16]}>{figure.affinity}</Text>
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
  </ScrollView>
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
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row', 
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingVertical: 3,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    paddingVertical: 10,
  },
  columnHeader: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
 



  cell: { 
    textAlign: 'center',
  },
  column1: {
    justifyContent: 'space-between',  width: 100,
  },
  column2: {
    justifyContent: 'space-between',  width: 50,
  },
  column3: {
    justifyContent: 'space-between', width: 120,
  },
  column4: {
    justifyContent: 'space-between', width: 50,
  },
  column5: {
    justifyContent: 'space-between', width: 100,
  },
  column6: {
    justifyContent: 'space-between', width: 100,
  },
  column6: {
    justifyContent: 'space-between', width: 50,
  },
  column7: {
    justifyContent: 'space-between', width: 50,
  },
  column8: {
    justifyContent: 'space-between', width: 40,
  },
  column9: {
    justifyContent: 'space-between', width: 100,
  },
  column10: {
    justifyContent: 'space-between', width: 40,
  },
  column11: {
    justifyContent: 'space-between', width: 100,
  },
  column12: {
    justifyContent: 'space-between', width: 100,
  },
  column13: {
    justifyContent: 'space-between', width: 40,
  },
  column14: {
    justifyContent: 'space-between', width: 40,
  },
  column15: {
    justifyContent: 'space-between', width: 40,
  },
  column16: {
    justifyContent: 'space-between', width: 40,
  },
  column17: {
    justifyContent: 'space-between', width: 100,
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
