import examples from './example.json';
import { openExampleDatabase } from '../ExampleDatabase'; // Import your database opening function
import displayErrorToast from '../../utils/DisplayErrorToast'; // Assuming utils.js contains the displayErrorToast function

// Function to initialize the example table with custom values
export const initExampleTable = () => {
  return new Promise((resolve, reject) => {
    openExampleDatabase().then(db => {
      db.transaction(tx => {
        // Delete existing data from the example table
        tx.executeSql(`DROP TABLE IF EXISTS example;`);

        // Create the example table if it doesn't exist
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS example (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            skill TEXT, 
            iq INTEGER 
          );`
        );

        // Insert examples from the JSON data into the example table
        examples.forEach(example => {
          tx.executeSql(
            'INSERT INTO example (name, skill, iq) VALUES (?, ?, ?)',
            [example.name, example.skill, example.iq],
            () => {}, // Success callback
            (tx, error) => {
              // Error callback
              console.error('Insertion error:', error);
              reject(error); // Reject the promise if an error occurs
            }
          );
        });
      }, (error) => {
        // Handle transaction error
        console.error('Transaction error:', error);
        displayErrorToast(error.message || 'Failed to initialise example table.');
        reject(error); // Reject the promise if an error occurs
      }, () => {
        // Transaction completed successfully
        console.log('Transaction init example completed successfully.');
        resolve(); // Resolve the promise when the transaction completes successfully
      });
    }).catch(error => {
      // Handle database opening error
      console.error('Error opening database:', error);
      reject(error); // Reject the promise if an error occurs during database opening
    });
  });
};
