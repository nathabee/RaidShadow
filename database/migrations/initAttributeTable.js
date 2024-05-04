import * as SQLite from 'expo-sqlite';
import attributes from './attribute.json';
import displayErrorToast from '../../utils/DisplayErrorToast';

// Function to initialize the attribute table with custom values
export const initAttributeTable = (db) => {
  // Start a transaction to execute SQL statements
  db.transaction(tx => {
    // Delete existing data from the attribute table (if it exists)
    tx.executeSql(`DROP TABLE IF EXISTS attribute;`);

    // Create the attribute table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS attribute (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        code TEXT,
        description TEXT
      );`
    );

    // Insert attributes from the JSON data into the attribute table
    Object.keys(attributes).forEach(type => {
      const typeAttributes = attributes[type];
      Object.keys(typeAttributes).forEach(code => {
        const description = typeAttributes[code];
        tx.executeSql(
          'INSERT INTO attribute (type, code, description) VALUES (?, ?, ?)',
          [type, code, description]
        );
      });
    });
  }, (error) => {
    // Handle transaction error
    console.error('Transaction error:', error);
    displayErrorToast(error.message || 'Failed to initialize attribute table.');
  }, () => {
    // Transaction completed successfully
    console.log('Attribute initialization completed successfully.');
  });
};
