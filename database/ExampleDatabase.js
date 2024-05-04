import * as SQLite from 'expo-sqlite';

// Function to open the SQLite database and return a promise
export const openExampleDatabase = () => {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase('example.db');
    if (db) {
      resolve(db);
    } else {
      reject(new Error('Failed to open example database'));
    }
  });
};

// Function to fetch data from the EXAMPLE table based on search criteria
export const fetchExampleData = (db, searchCriteria) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM EXAMPLE WHERE name LIKE ?`,
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
