// initDatabase.js
import * as SQLite from 'expo-sqlite';
import { initFigureTable } from '../database/migrations/initFigureTable'; // Import database functions

const initDatabase = () => {
  // const db = SQLite.openDatabase('mydb.db'); // Open the database connection
  initFigureTable(db); // Initialize the figure table
  // return db;
};

// Export both db and initDatabase
export { initDatabase };

// You can also directly export db if needed
// export const db = initDatabase();
