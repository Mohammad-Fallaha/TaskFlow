import db from './database';
import { Platform } from 'react-native';

export const initDB = () => {
  if (Platform.OS === 'web') return;

  db.execSync(`
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT,
      email TEXT
    );
  `);
};