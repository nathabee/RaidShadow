import React, { useContext  } from 'react';
import { Alert } from 'react-native'; 

import ButtonGroup from './ButtonGroup';

 
import {  resetDatabase, deleteDatabase  } from '../../database/ChampionDatabase';


const InitDatabaseComponent = ({ dbe , onUpdate}) => { 

    const handleReset = () => {
        Alert.alert(
            'Reset Database',
            'Are you sure you want to reset the database?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Reset',
                    onPress: () => {
                        console.log("resetDatabase");
                        if (!dbe) {
                            console.error('Database is not initialized.');
                            return;
                          }
                        resetDatabase(dbe); // Reset the database
                        onUpdate();
                        console.log("resetDatabase done"); 
                    },
                },
            ]
        );
    };

    const handleDelete = () => {
        Alert.alert(
            'Delete Database',
            'Are you sure you want to delete the entire database?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        console.log("deleteDatabase");    
                        if (!dbe) {
                            console.error('Database is not initialized.');
                            return;
                          }
                        deleteDatabase(dbe); // Reset the database
                        onUpdate();
                        console.log("deleteDatabase done"); 
                    },
                },
            ]
        );
    };

 
  

    const handleImport = () => {
        // Logic for importing from CSV file
        console.log("handleImport pressed");
        alert("not implemented",
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Reset',
                    onPress: () => {
                        //InitFigureCSV(); // Create figure table if not exists  
                        fetchData(); // Fetch data after deleting
                    },
                },
            ]
        );

    };
    return (
        <ButtonGroup
            onReset={handleReset}
            onDeleteAll={handleDelete}
            onImport={handleImport}
        />
    );
};

export default InitDatabaseComponent;
