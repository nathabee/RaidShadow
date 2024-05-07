import * as SQLite from 'expo-sqlite';
import { initChampionTable } from './migrations/initChampionTable'; // Import database functions
//import { initAttributeTable } from './migrations/initAttributeTable'; // Import database functions
import displayErrorToast from '../utils/DisplayErrorToast'; // Assuming utils.js contains the displayErrorToast function


// Function to open the SQLite database and return a promise 
const openChampionDatabase = () => {
  return new Promise((resolve, reject) => {
    try {
      const db = SQLite.openDatabase('champion.db');
      resolve(db);
    } catch (error) {
      reject(error);
    }
  });
};


const fetchChampionData = async (db, searchCriteria) => {
  //console.log("DEBUG fetchChampionData"); 

  if (searchCriteria == null || searchCriteria === '') { // Check for null or empty string
    console.log("DEBUG SELECT * FROM CHAMPION");
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM CHAMPION;`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  } else if (typeof searchCriteria === 'string') {
    const lowcaseCriteria = searchCriteria.toLowerCase(); // Convert to lowercase if it's a string
    console.log("DEBUG SELECT * FROM CHAMPION WHERE LOWER(name) LIKE ?", lowcaseCriteria);
    //console.log("Search Criteria (Lowercased):", lowcaseCriteria); // Log the lowercased searchCriteria

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM CHAMPION WHERE LOWER(name) LIKE ?;`,
          [`%${lowcaseCriteria}%`],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  } else {
    // Handle the case where searchCriteria is not a string
    console.error('Invalid search criteria:', searchCriteria);
    return Promise.reject(new Error('Invalid search criteria'));
  }
};






const deleteDatabase = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction(async tx => {
      try {
        await tx.executeSql('DROP TABLE IF EXISTS champion;');
        //await tx.executeSql('DELETE FROM attribute');

        console.log('Database deleted successfully.');
        resolve();
      } catch (error) {
        console.error('Error deleting database:', error);
        displayErrorToast(error.message || 'Failed to delete database.');
        reject(error);
      }
    });
  });
};



const resetDatabase = async (db) => {
  return new Promise((resolve, reject) => {
    db.transaction(async tx => {
      try {
        await deleteDatabase(db);
        //await initAttributeTable(db);
        await initChampionTable(db, true); // Assuming this function properly handles transactions
        resolve();
      } catch (error) {
        console.error('Error resetting database:', error);
        displayErrorToast(error.message || 'Failed to reset database.');
        reject(error);
      }
    });
  });
};




const insertChampion = async (db, newData) => {
  return new Promise((resolve, reject) => {
    db.transaction(async tx => {
      try {
        const { name, skill, skillName, primaryDamageStat, base, ATKorDEFBuff, book, mastery, total, damageBonusFromBooks, damageGrade, target, faction, rarity, role, affinity } = newData;

        console.log('insertChampion : going to execute SQL insert', newData);

        await tx.executeSql(
          'INSERT INTO Champion (name, skill, skillName, primaryDamageStat, base, ATKorDEFBuff, book, mastery, total, damageBonusFromBooks, damageGrade, target,faction,rarity,role,affinity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?);',
          [name, skill, skillName, primaryDamageStat, base, ATKorDEFBuff, book, mastery, total, damageBonusFromBooks, damageGrade, target, faction, rarity, role, affinity]
        );

        console.log('Champion inserted successfully.');
        resolve();
      } catch (error) {
        console.error('Error inserting champion:', error);
        displayErrorToast(error.message || 'Failed to insert champion.');
        reject(error);
      }
    });
  });
};




const deleteChampionById = async (db, id) => {
  return new Promise((resolve, reject) => {
    db.transaction(async tx => {
      try {
        await tx.executeSql('DELETE FROM Champion WHERE id = ?;', [id]);
        console.log(`Champion with ID ${id} deleted successfully`);
        resolve();
      } catch (error) {
        console.error(`Error deleting Champion with ID ${id}:`, error);
        displayErrorToast(error.message || 'Failed to delete champion.');
        reject(error);
      }
    });
  });
};



const updateChampionById = async (db, id, newData) => {
  const { name, skill, skillName, primaryDamageStat, base, ATKorDEFBuff, book, mastery, total, damageBonusFromBooks, damageGrade, target, faction, rarity, role, affinity } = newData;

  return new Promise((resolve, reject) => {
    db.transaction(async tx => {
      try {
        await tx.executeSql(
          'UPDATE Champion SET name = ?, skill = ?, skillName = ?, primaryDamageStat = ?, base = ?, ATKorDEFBuff = ?, book = ?, mastery = ?, total = ?, damageBonusFromBooks = ?, damageGrade = ?, target = ?, faction = ?, rarity = ?, role = ?, affinity = ? WHERE id = ?;',
          [name, skill, skillName, primaryDamageStat, base, ATKorDEFBuff, book, mastery, total, damageBonusFromBooks, damageGrade, target, faction, rarity, role, affinity, id]
        );
        console.log(`Champion with ID ${id} updated successfully`);
        resolve();
      } catch (error) {
        console.error(`Error updating Champion with ID ${id}:`, error);
        displayErrorToast(error.message || 'Failed to update champion.');
        reject(error);
      }
    });
  });
};




export { insertChampion, updateChampionById, deleteChampionById, fetchChampionData, openChampionDatabase, resetDatabase, deleteDatabase };

