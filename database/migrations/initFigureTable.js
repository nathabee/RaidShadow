import * as SQLite from 'expo-sqlite';
// import figures from './Figures.json'; // Import the JSON file
import figures from './figure.json' ; // Import the JSON file
import displayErrorToast from '../../utils/DisplayErrorToast'; // Assuming utils.js contains the displayErrorToast function


// Function to initialize the figure table with custom values
export const initFigureTable = (db) => {
  // Start a transaction to execute SQL statements
  db.transaction(tx => {
    // Delete existing data from the figure table
    tx.executeSql(`DROP TABLE IF EXISTS figure;`);
    
    // Create the figure table if it doesn't exist
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS figure (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        skill TEXT,
        skillName TEXT,
        primaryDamageStat TEXT,
        base INTEGER,
        ATKorDEFBuff REAL,
        book REAL,
        mastery REAL,
        total INTEGER,
        damageBonusFromBooks INTEGER,
        damageGrade TEXT,
        target TEXT,
        faction TEXT,
        rarity TEXT,
        role TEXT,
        affinity TEXT
      );`
    );

    // Insert figures from the JSON data into the figure table
    figures.forEach(figure => {
      tx.executeSql(
        'INSERT INTO figure (name, skill, skillName, primaryDamageStat, base, ATKorDEFBuff, book, mastery, total, damageBonusFromBooks, damageGrade, target,faction,rarity,role,affinity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)',
        [figure.champion, figure.skill, figure.skill_name, figure.primary_damage_stat, figure.base, figure.atk_or_def_buff, figure.book, figure.mastery, figure.total, figure.damage_bonus_from_books, figure.damagegrade, figure.target, figure.faction, figure.rarity, figure.role, figure.affinity]
      );
    });
  }, (error) => {
    // Handle transaction error
    console.error('Transaction error:', error);
    displayErrorToast(error.message || 'Failed to initialise figure table.');
  }, () => {
    // Transaction completed successfully
    console.log('Transaction completed successfully.');
  });
};



