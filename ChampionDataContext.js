import React, { createContext, useState, useEffect, useContext } from 'react';
import { openChampionDatabase, fetchChampionData, insertChampion, updateChampionById, deleteChampionById, resetDatabase, deleteDatabase } from './database/ChampionDatabase'; // Import database functions
// import displayErrorToast from './utils/DisplayErrorToast'; // Assuming utils.js contains the displayErrorToast function
import { initChampionTable } from './database/migrations/initChampionTable'; // Import database functions
import * as SQLite from 'expo-sqlite';



// Context and Provider for Figure data
const ChampionDataContext = createContext();





export const ChampionDataProvider = ({ children }) => {
  const [championData, setChampionData] = useState([]);
  const [isModified, setIsModified] = useState(true); // Flag to indicate modification 
  const [searchName, setSearchName] = useState('');
  const [resetAll, setResetAll] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);

  const [newChampion, setNewChampion] = useState(null);

  const [db, setDb] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("DEBUG fetchData called " );
      if (isModified && db) {
        try {
          const champions = await fetchChampionData(db, searchName);
          setChampionData(champions);
          setIsModified(!isModified); // Set modification flag to no modification after fetch
        } catch (error) {
          console.error('Error fetching champions:', error);
        }
      }
    };

    fetchData();
  }, [isModified, db]);


 
  const handleSearchName =    (name) => {
    console.log("handleSearchName setSearchName to ", name);
    setSearchName(name); 
    setIsModified(!isModified);
    console.log("handleSearchName SearchName = ", searchName);
  };

  useEffect(() => {
    const deleteDB = async () => {
      if (deleteAll) {
        try {
          await deleteDatabase(db);
          console.log("DEBUG deleteDatabase was called in handleDeleteAll"); 
          setDeleteAll(false); 
            setIsModified(!isModified); // Set modification flag to no modification after fetch
          } catch (error) {
            console.error('Error deleting champions:', error);
          } 
        }
    };

    deleteDB();
  }, [deleteAll]);

  const handleDeleteAll =    ( ) => {
    console.log("handleDeleteAll called" );
    setDeleteAll(true);  
  };

  useEffect(() => {
    const resetDB = async () => {
      if (resetAll) {
        try {
          await resetDatabase(db);
          console.log("DEBUG resetDatabase was called in handleResetAll"); 
          setResetAll(false); 
            setIsModified(!isModified); // Set modification flag to no modification after fetch
          } catch (error) {
            console.error('Error reseting champions:', error);
          } 
        }
    };

    resetDB();
  }, [resetAll]);

  const handleResetAll =    ( ) => {
    console.log("handleResetAll called" );
    setResetAll(true);  
  };
  
  useEffect(() => {
    console.log("openChampionDatabase will be called in the mount of the useeffect");
    openChampionDatabase()
      .then(databasechampion => {
        console.log("Database opened successfully");
        setDb(databasechampion);
      })
      .catch(error => {
        console.error('Error initializing database:', error);
        // Handle error as needed
      });
      setIsModified(true); // Set modification flag after insert
  
  }, []);


  // Functions to handle CRUD operations with modification flag

  const handleInsertChampion =    (champion) => {
    console.log("handleInsertChampion setNewChampion for to ", champion );
    setNewChampion(champion);  
  };

  useEffect(() => {
    const insertNewChampion = async () => {
      if (newChampion) {
        try {
          await  insertChampion(db, newChampion);
          console.log("DEBUG insertChampion was called in insertNewChampion"); 
          //setNewChampion(null); 
          setIsModified(!isModified); // Set modification flag to no modification after fetch
          } catch (error) {
            console.error('Error inserting champions:', error);
          } 
        }
    };

    insertNewChampion();
  }, [newChampion]);

 

  const handleUpdateChampion = async (championData) => {
    if (db) {
      try {
        await updateChampionById(db, championData.id, championData);
        setIsModified(true); // Set modification flag after update
      } catch (error) {
        console.error('Error updating champion:', error);
        // Handle error as needed, e.g., display an error message
      }
    }
    else {
      console.error('called handleUpdateChampion with db null');

    }
  };

  const handleDeleteChampion = async (championId) => {
    if (db) {
      try {
        await deleteChampionById(db, championId);
        setIsModified(true); // Set modification flag after delete
      } catch (error) {
        console.error('Error deleting champion:', error);
        // Handle error as needed, e.g., display an error message
      }
    }
    else {
      console.error('called handleDeleteChampion with db null');

    }
  };


 


  return (
    <ChampionDataContext.Provider
      value={{
        championData,
        handleInsertChampion,
        handleUpdateChampion,
        handleDeleteChampion,
        handleResetAll,
        handleDeleteAll,
        handleSearchName,
      }}
    >
      {children}
    </ChampionDataContext.Provider>
  );
};

export default ChampionDataContext;

