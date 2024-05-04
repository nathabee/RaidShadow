// initDatabase.js
import * as SQLite from 'expo-sqlite';
import { initAttributeTable } from '../database/migrations/initAttributeTable'; // Import database functions
import { initFigureTable } from '../database/migrations/initFigureTable'; // Import database functions

const initDatabase = () => {
  // const db = SQLite.openDatabase('mydb.db'); // Open the database connection
  initAttributeTable(db); // Initialize the attribute table
  initFigureTable(db); // Initialize the figure table
  // return db;
};

// Export both db and initDatabase
export { initDatabase };
