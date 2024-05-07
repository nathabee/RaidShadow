import React, { useContext  } from 'react';
import { Alert } from 'react-native'; 

import ButtonGroup from './ButtonGroup';
import ChampionDataContext from '../../ChampionDataContext';
 


const InitDatabaseComponent = ( ) => { 
 
    const {   handleResetAll , handleDeleteAll } = useContext(ChampionDataContext);

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
                        
                        try {
                            handleResetAll( ); // Reset the database and set modified flag to fetch data 
                          } catch (error) {
                            console.error('Error clearing off the database:', error);
                            // Handle error as needed, e.g., display an error message
                          }

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
                        handleDeleteAll(); // delete  the database database and set modified flag to fetch data 
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
                        //fetchData(); // Fetch data after deleting
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
