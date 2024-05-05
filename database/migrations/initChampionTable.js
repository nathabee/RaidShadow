import champions from './champion.json';
import displayErrorToast from '../../utils/DisplayErrorToast'; // Assuming utils.js contains the displayErrorToast function

// Function to initialize the example table with custom values
export const initChampionTable = ( dbe, reset ) => {
  return new Promise((resolve, reject) => { 
      dbe.transaction(tx => { 

        if (reset) {
          // Drop the table if it exists
          tx.executeSql(
            'DROP TABLE IF EXISTS champion;',
            [],
            () => {
              // Success callback
              console.log('Table dropped successfully.');
            },
            (tx, error) => {
              // Error callback
              console.error('Dropping table error:', error);
              // Don't reject the promise here as this is not critical for initialization
            }
          );
        }
        
        // Create the champion table if it doesn't exist
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS champion (
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
            affinity TEXT, 
          );`
        );

        if (reset ) {
        // Insert examples from the JSON data into the example table
        champions.forEach(champion => {
          tx.executeSql(
            'INSERT INTO champion (name, skill, skillName, primaryDamageStat, base, ATKorDEFBuff, book, mastery, total, damageBonusFromBooks, damageGrade, target,faction,rarity,role,affinity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)',
            [champion.champion, champion.skill, champion.skill_name, champion.primary_damage_stat, champion.base, champion.atk_or_def_buff, champion.book, champion.mastery, champion.total, champion.damage_bonus_from_books, champion.damagegrade, champion.target, champion.faction, champion.rarity, champion.role, champion.affinity],
    
            () => {}, // Success callback
            (tx, error) => {
              // Error callback
              console.error('Insertion error in champion:', error);
              reject(error); // Reject the promise if an error occurs
            }
          );
        });};

      }, (error) => {
        // Handle transaction error
        console.error('Transaction error:', error);
        displayErrorToast(error.message || 'Failed to initialise champion table.');
        reject(error); // Reject the promise if an error occurs
      }, () => {
        // Transaction completed successfully
        console.log('Transaction init champion completed successfully.');
        resolve(); // Resolve the promise when the transaction completes successfully
      });
 
  });
};
