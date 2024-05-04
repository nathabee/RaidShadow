import { openExampleDatabase } from '../database/ExampleDatabase';
import { initExampleTable } from '../database/migrations/initExampleTable';

export const initExample = () => {
  return openExampleDatabase().then(async db => {
    try {
      await initExampleTable(db); // Initialize the example table
      console.log('Example table initialized successfully.');
      return db; // Return the database instance
    } catch (error) {
      // Handle errors
      console.error('Error initializing Example table:', error);
      throw error; // Throw the error to handle it in the caller function
    }
  }).catch(error => {
    // Handle database opening error
    console.error('Error opening database:', error);
    throw error; // Throw the error to handle it in the caller function
  });
};
