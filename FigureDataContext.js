import React, { createContext, useState, useEffect, useContext } from 'react';
import { getFigures, insertFigure, updateFigureById, deleteFigureById, resetDatabase, deleteDatabase } from './database/db'; // Import database functions
import displayErrorToast from './utils/DisplayErrorToast'; // Assuming utils.js contains the displayErrorToast function
import { initFigureTable } from './database/migrations/initFigureTable'; // Import database functions
import * as SQLite from 'expo-sqlite';




// Context and Provider for Figure data
const FigureDataContext = createContext();

const db = SQLite.openDatabase('mydb.db'); // Open the database connection
console.log("database db just created");

// Initialize the figure table
initFigureTable(db);

export const FigureDataProvider = ({ children }) => {
  const [figureData, setFigureData] = useState([]);
  const [isModified, setIsModified] = useState(true); // Flag to indicate modification



  // setIsModified(true); // Reset flag after fetching data



  console.log("provider database initFigureTable done ");



  // useEffect to fetch data when modification flag changes
  useEffect(() => {
    if (isModified) {
      // fetchData(); // Fetch data when modification flag is true
      console.log('useEffect isModified true ');
      getFigures(db).then(figures => {
        // console.log('Figures retrieved:', figures);
        setFigureData(figures); // Update the figure data in context
        //console.log("setFigureData set the figure");
        // Handle figures here
      })
        .catch(error => {
          console.error('Error fetching figures:', error);
          // Handle error here
        });

      setIsModified(false); // Reset flag after fetching data
    }
  }, [isModified]);



  // Functions to handle CRUD operations with modification flag
  const handleInsertFigure = (figureData) => {
    insertFigure(db, figureData);
    setIsModified(true); // Set modification flag after insert
  };

  const handleUpdateFigure = (figureData) => {
    updateFigureById(db, figureData.id, figureData);
    setIsModified(true); // Set modification flag after update
  };

  const handleDeleteFigure = (figureId) => {
    deleteFigureById(db, figureId);
    setIsModified(true); // Set modification flag after delete
  };

  const handleResetAll = () => {
    resetDatabase(db);
    setIsModified(true); // Set modification flag after delete
  };

  const handleDeleteAll = () => {
    deleteDatabase(db);
    setIsModified(true); // Set modification flag after delete
  };

  return (
    <FigureDataContext.Provider
      value={{
        figureData,
        handleInsertFigure,
        handleUpdateFigure,
        handleDeleteFigure,
        handleResetAll,
        handleDeleteAll,
      }}
    >
      {children}
    </FigureDataContext.Provider>
  );
};

export default FigureDataContext;

