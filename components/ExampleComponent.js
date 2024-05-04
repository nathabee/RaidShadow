import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchExampleData } from '../database/ExampleDatabase';
import { Picker } from '@react-native-picker/picker';


const ITEMS_PER_PAGE = 20;

const ExampleComponent = ({ dbe }) => {
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
      const fetchedData = await fetchExampleData(dbe, searchName);
      // Sort data based on IQ column
      // fetchedData = fetchedData.sort((a, b) => (sortAscending ? a.iq - b.iq : b.iq - a.iq));

      //setData(fetchedData);
      const sortedData = [...fetchedData].sort((a, b) => (sortAscending ? a.iq - b.iq : b.iq - a.iq));
      setData(sortedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, [dbe, searchName, sortAscending]);

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
      <Text>{item.skill}</Text>
      <Text>{item.iq}</Text>
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
        <Text style={{ fontWeight: 'bold' }}> id </Text>
        <Text style={{ fontWeight: 'bold' }}> name </Text>
        <Text style={{ fontWeight: 'bold' }}> skill</Text>
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

export default ExampleComponent;
