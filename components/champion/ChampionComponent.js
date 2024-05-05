import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, ActivityIndicator, TouchableOpacity, Image, Linking } from 'react-native';
import { fetchChampionData } from '../../database/ChampionDatabase';
import { Picker } from '@react-native-picker/picker';
import ImageView from '../shared/ImageView';
import AttributeCode from '../../utils/AttributeCode'


const ITEMS_PER_PAGE = 20;



// import ChampionImage from './ChampionImage.js'; 



const ChampionComponent = ({ dbe, dbUpdate }) => {
  const [searchName, setSearchName] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(''); // State to hold selected skill for filtering
  const [selectedFaction, setSelectedFaction] = useState(''); // State to hold selected skill for filtering

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
  }, [searchName, sortAscending, dbUpdate]);

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


  const toggleSortOrder = () => {
    setSortAscending(!sortAscending);
  };

  // Skill selection

  const handleSkillChange = (value) => {
    setSelectedSkill(value);
    // Refetch data based on selected skill
    fetchData();
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

  // Faction selection

  const handleFactionChange = (value) => {
    setSelectedFaction(value);
    // Refetch data based on selected skill
    fetchData();
  };
 
  const countFactions = () => {
    const factionCounts = {};
    data.forEach(item => {
      const faction = item.faction;
      factionCounts[faction] = (factionCounts[faction] || 0) + 1;
    });
    return factionCounts;
  };

  const factionCounts = countFactions();

  // Function to render the Picker items
  const renderFactionItems = () => {
    const items = [];
    items.push(<Picker.Item key="all" label="All Factions" value="" />);
    Object.entries(factionCounts).forEach(([faction, count]) => {
      factionCode = `FACT-${faction}`
      items.push(<Picker.Item key={faction} label={`${AttributeCode[factionCode]}  (${faction}) (${count})`} value={faction} />);
    });
    return items;
  };


  const renderItem = ({ item }) => {
    //const paddedId = String(item.id % 148).padStart(4, '0');
    //const championImageUri = `../../assets/champion/champion_${paddedId}.jpeg`;
    //console.log(`Image name: ${championImageUri}`);

    const championLink = `https://ayumilove.net/raid-shadow-legends-${item.name.toLowerCase()}-skill-mastery-equip-guide/`;

    const factionCode = `FACT-${item.faction}`;
    const rarityCode = `RARI-${item.rarity}`;
    const roleCode = `ROLE-${item.role}`;
    const affinityCode = `AFFI-${item.affinity}`;


    const handleChampionPress = () => {
      Linking.openURL(championLink);
    };

    return (
      <View style={styles.championListing}>
        <View style={styles.championImage}>
          <Text >Faction : {AttributeCode[factionCode]} </Text>
          < ImageView codeimage={factionCode} size={100} />
        </View>
        <View style={styles.championInfo}>
          <TouchableOpacity onPress={handleChampionPress}>
            <Text style={styles.championName}>{item.name}</Text>
          </TouchableOpacity>
          <View style={styles.championStats}>
            <Text >total : {item.total}</Text>
            <Text>primaryDamageStat : {item.primaryDamageStat}</Text>
            <Text>base : {item.base}</Text>
            <Text>ATKorDEFBuff : {item.ATKorDEFBuff}</Text>
            <Text>book: {item.book}</Text>
            <Text  >{item.mastery}</Text>
            <Text >damage Bonus From Books :{item.damageBonusFromBooks}</Text>
            <Text    >damageGrade : {item.damageGrade}</Text>
            <Text    >target : {item.target}</Text>
            <Text    >Skills : {item.skill}</Text>
          </View>
        </View>
        <View style={styles.championMeta}>

          <Text >rarity : {AttributeCode[rarityCode]} </Text>
          < ImageView codeimage={rarityCode} size={30} />
          <Text >role : {AttributeCode[roleCode]} </Text>
          < ImageView codeimage={roleCode} size={30} />
          <Text >affinity : {AttributeCode[affinityCode]} </Text>
          < ImageView codeimage={affinityCode} size={30} />
        </View>
      </View>
    );
  };




  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
          value={searchName}
          placeholder="Search by name"
          onChangeText={text => setSearchName(text)}
        />
        <TouchableOpacity style={{ height: 40, width: 60, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }} onPress={handleSearch}>
          <Text style={{ color: 'white' }}>Search</Text>
        </TouchableOpacity>
        <View > 
        <Picker
          selectedValue={selectedSkill}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => handleSkillChange(itemValue)}
        >
          {renderPickerItems()}
        </Picker>
        <Picker
          selectedValue={selectedFaction}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => handleFactionChange(itemValue)}
        >
          {renderFactionItems()}
        </Picker>
         </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

        
        <TouchableOpacity onPress={toggleSortOrder}>
          <Text style={{ fontWeight: 'bold' }}>Total{sortAscending ? '↑' : '↓'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data.filter(item => ( (!selectedSkill ||  item.skill === selectedSkill) && (!selectedFaction  ||  item.faction === selectedFaction)))}
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
  // new listing
  championListing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  championImage: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  championInfo: {
    flex: 2,
    paddingHorizontal: 10,
  },
  championName: {
    fontSize: 18,
    fontWeight: 'bold',
  }, 
  tag: {
    marginTop: 10,
    color: 'orange',
  },
  championMeta: {
    flex: 1,
    alignItems: 'flex-end',
  }, 
  metaInfo: {
    alignItems: 'flex-end',
  },
  metaText: {
    color: 'gray',
    marginBottom: 5,
  },  
});


export default ChampionComponent;
