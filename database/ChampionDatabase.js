import * as SQLite from 'expo-sqlite';
import { initChampionTable } from './migrations/initChampionTable'; // Import database functions
import { initAttributeTable } from './migrations/initAttributeTable'; // Import database functions
import displayErrorToast from '../utils/DisplayErrorToast'; // Assuming utils.js contains the displayErrorToast function


// Function to open the SQLite database and return a promise
const openChampionDatabase = () => {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase('champion.db');
    if (db) { 
      resolve(db);
    } else {
      reject(new Error('Failed to open champion database'));
    }
  });
};

// Function to fetch data from the EXAMPLE table based on search criteria
const fetchChampionData = (db, searchCriteria) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM CHAMPION WHERE name LIKE ?`,
        [`%${searchCriteria}%`],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
 

const deleteDatabase = (db) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'delete FROM champion; delete from attribute;'
      );
    },
    (error) => {
      console.error('Error deleting database:', error);
      displayErrorToast(error.message || 'Failed to drop figure table.');
    },
    () => {
      console.log('Database deleted successfully.');
    }
  );
};

const resetDatabase = (db) => { 
  deleteDatabase(db); 
  initAttributeTable(db);
  initChampionTable(db, true); // Assuming this function properly handles transactions
};



export {  fetchChampionData, openChampionDatabase, resetDatabase, deleteDatabase };

