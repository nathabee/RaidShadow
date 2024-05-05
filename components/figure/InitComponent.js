import React, { useContext  } from 'react';
import { Alert } from 'react-native';
import FigureDataContext from '../../FigureDataContext';

import ButtonGroup from './ButtonGroup';

 



const InitComponent = () => {
    const {   handleResetAll , handleDeleteAll } = useContext(FigureDataContext);

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
                        console.log("handleResetAll");
                        handleResetAll(); // Reset the database
                        console.log("handleResetAll done"); 
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
                        console.log("handleDeleteAll");
                        handleDeleteAll(); // Reset the database
                        console.log("handleDeleteAll done"); 
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

export default InitComponent;
