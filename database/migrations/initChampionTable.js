import champions from './champion.json';
import displayErrorToast from '../../utils/DisplayErrorToast'; // Assuming utils.js contains the displayErrorToast function

// Function to initialize the example table with custom values
export const initChampionTable = async (db, reset) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.transaction(async tx => {
        if (reset) {
          // Drop the table if it exists
          await tx.executeSql(
            'DROP TABLE IF EXISTS champion;',
            []
          );
          console.log('Table dropped successfully.');
        }
        
        // Create the champion table if it doesn't exist
        await tx.executeSql(
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
            affinity TEXT
          );`
        );

        if (reset) {
          // Insert examples from the JSON data into the example table
          champions.forEach(async champion => {
            await tx.executeSql(
              'INSERT INTO champion (name, skill, skillName, primaryDamageStat, base, ATKorDEFBuff, book, mastery, total, damageBonusFromBooks, damageGrade, target,faction,rarity,role,affinity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)',
              [
                champion.champion,
                champion.skill,
                champion.skill_name,
                champion.primary_damage_stat,
                champion.base,
                champion.atk_or_def_buff,
                champion.book,
                champion.mastery,
                champion.total,
                champion.damage_bonus_from_books,
                champion.damagegrade,
                champion.target,
                champion.faction,
                champion.rarity,
                champion.role,
                champion.affinity
              ]
            );
          });
        }
      });
      console.log('Transaction init champion completed successfully.');
      resolve();
    } catch (error) {
      console.error('Error initializing champion table:', error);
      reject(error);
    }
  });
};