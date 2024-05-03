import * as SQLite from 'expo-sqlite';
import { initFigureTable } from './migrations/initFigureTable'; // Import database functions
import displayErrorToast from '../utils/DisplayErrorToast'; // Assuming utils.js contains the displayErrorToast function

const createFigureTable = (db) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS figure (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, skill TEXT, skillName TEXT, primaryDamageStat TEXT, base INTEGER, ATKorDEFBuff REAL, book REAL, mastery REAL, total INTEGER, damageBonusFromBooks INTEGER, damageGrade TEXT, target TEXT)'
      );
    },
    (error) => {
      console.error('Error creating figure table:', error);
      displayErrorToast(error.message || 'Failed to create figure table.');
    },
    () => {
      console.log('Figure table created successfully.');
    }
  );
};

const deleteDatabase = (db) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'DELETE FROM figure'
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
  initFigureTable(db); // Assuming this function properly handles transactions
};




const insertFigure  = (db,   newData) => {
  const { name, skill, skillName, primaryDamageStat, base, ATKorDEFBuff, book, mastery, total, damageBonusFromBooks, damageGrade, target } = newData;

  db.transaction(
    tx => {
      tx.executeSql(
        'INSERT INTO figure (name, skill, skillName, primaryDamageStat, base, ATKorDEFBuff, book, mastery, total, damageBonusFromBooks, damageGrade, target) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, skill, skillName, primaryDamageStat, base, ATKorDEFBuff, book, mastery, total, damageBonusFromBooks, damageGrade, target],
        () => console.log(`Figure with ID ${id} updated successfully`),
        (error) => console.error(`Error updating figure  ${newData}:`, error)
      );
    },
    (error) => {
      console.error('Error updating figure transaction:', error);
      displayErrorToast(error.message || 'Failed to update figure table.');
    }
  );
};



const deleteFigureById = (db, id ) => {
 
  db.transaction(
    tx => {
      tx.executeSql(
        'DELETE FROM figure WHERE id = ?',
        [  id],
        () => console.log(`Figure with ID ${id} deleted successfully`),
        (error) => console.error(`Error deleting figure with ID ${id}:`, error)
      );
    },
    (error) => {
      console.error('Error deleting figure transaction:', error);
      displayErrorToast(error.message || 'Failed to update figure table.');
    }
  );
};


const updateFigureById = (db, id, newData) => {
  const { name, skill, skillName, primaryDamageStat, base, ATKorDEFBuff, book, mastery, total, damageBonusFromBooks, damageGrade, target } = newData;

  db.transaction(
    tx => {
      tx.executeSql(
        'UPDATE figure SET name = ?, skill = ?, skillName = ?, primaryDamageStat = ?, base = ?, ATKorDEFBuff = ?, book = ?, mastery = ?, total = ?, damageBonusFromBooks = ?, damageGrade = ?, target = ? WHERE id = ?',
        [name, skill, skillName, primaryDamageStat, base, ATKorDEFBuff, book, mastery, total, damageBonusFromBooks, damageGrade, target, id],
        () => console.log(`Figure with ID ${id} updated successfully`),
        (error) => console.error(`Error updating figure with ID ${id}:`, error)
      );
    },
    (error) => {
      console.error('Error updating figure transaction:', error);
      displayErrorToast(error.message || 'Failed to update figure table.');
    }
  );
};

const getFigures = (db) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM figure',
          [],
          (_, { rows }) => {
            const figures = rows._array; // Extract figures from the result
            resolve(figures); // Resolve the promise with figures
          },
          (_, error) => {
            console.error('Error fetching figures:', error);
            reject(error); // Reject the promise with the error
          }
        );
      },
      (error) => {
        console.error('Error fetching figures transaction:', error);
        displayErrorToast(error.message || 'Error fetching figures transaction');
      }
    );
  });
};

export { insertFigure, updateFigureById,deleteFigureById, getFigures, resetDatabase, deleteDatabase };


