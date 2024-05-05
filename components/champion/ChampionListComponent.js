import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchChampionData } from '../../database/ChampionDatabase';
import { Picker } from '@react-native-picker/picker';


const ITEMS_PER_PAGE = 20;

const ChampionListComponent = ({ dbe , dbUpdate }) => {
  const [searchName, setSearchName] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(''); // State to hold selected skill for filtering

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [sortAscending, setSortAscending] = useState(true); // State to track sorting order


  const fetchData = useCallback(async () => {
    if (!dbe) {
      console.error('Database is not initialized.');
      return;
    }
    setLoading(true);
    try {
      const fetchedData = await fetchChampionData(dbe, searchName);
      // Sort data based on total column 
      const sortedData = [...fetchedData].sort((a, b) => (sortAscending ? a.total - b.total : b.total - a.total));
      setData(sortedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, [  searchName, sortAscending,dbUpdate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = () => {
    setPage(0);
    fetchData();
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleSkillChange = (value) => {
    setSelectedSkill(value);
    // Refetch data based on selected skill
    fetchData();
  };

  const toggleSortOrder = () => {
    setSortAscending(!sortAscending);
  };

  // Function to count the number of people with each skill
  const countSkills = () => {
    const skillCounts = {};
    data.forEach(item => {
      const skill = item.skill;
      skillCounts[skill] = (skillCounts[skill] || 0) + 1;
    });
    return skillCounts;
  };

  const skillCounts = countSkills();

  // Function to render the Picker items
  const renderPickerItems = () => {
    const items = [];
    items.push(<Picker.Item key="all" label="All Skills" value="" />);
    Object.entries(skillCounts).forEach(([skill, count]) => {
      items.push(<Picker.Item key={skill} label={`${skill} (${count})`} value={skill} />);
    });
    return items;
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
      <Text>{item.id}</Text>
      <Text>{item.name}</Text>  
              <Text style={[styles.cell, styles.column2]}>{item.skill}</Text>
              <Text style={[styles.cell, styles.column3]}>{item.skillName}</Text>
              <Text style={[styles.cell, styles.column4]}>{item.primaryDamageStat}</Text>
              <Text style={[styles.cell, styles.column5]}>{item.base}</Text>
              <Text style={[styles.cell, styles.column6]}>{item.ATKorDEFBuff}</Text>
              <Text style={[styles.cell, styles.column7]}>{item.book}</Text>
              <Text style={[styles.cell, styles.column8]}>{item.mastery}</Text>
              <Text style={[styles.cell, styles.column9]}>{item.total}</Text>
              <Text style={[styles.cell, styles.column10]}>{item.damageBonusFromBooks}</Text>
              <Text style={[styles.cell, styles.column11]}>{item.damageGrade}</Text>
              <Text style={[styles.cell, styles.column12]}>{item.target}</Text>
              <Text style={[styles.cell, styles.column13]}>{item.faction}</Text>
              <Text style={[styles.cell, styles.column14]}>{item.rarity}</Text>
              <Text style={[styles.cell, styles.column15]}>{item.role}</Text>
              <Text style={[styles.cell, styles.column16]}>{item.affinity}</Text>


    </View>
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={searchName}
        placeholder="Search by name"
        onChangeText={text => setSearchName(text)}
      />
      <Button title="Search" onPress={handleSearch} />
      <Picker
        selectedValue={selectedSkill}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => handleSkillChange(itemValue)}
      >
        {renderPickerItems()}
      </Picker>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
 
        <View style={styles.headerRow}>
            <Text style={[styles.columnHeader, styles.column1]}>id</Text>
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

        <TouchableOpacity onPress={toggleSortOrder}>
          <Text style={{ fontWeight: 'bold' }}>I.Q. {sortAscending ? '↑' : '↓'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data.filter(item => !selectedSkill || item.skill === selectedSkill)}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
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

  
export default ChampionListComponent;
