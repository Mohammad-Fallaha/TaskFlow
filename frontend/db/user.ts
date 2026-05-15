import db from './database';
import { Platform } from 'react-native';

export const saveUser = (name: string, email: string) => {
  db.runSync(
    'INSERT OR REPLACE INTO user (id, name, email) VALUES (1, ?, ?);',
    [name, email]
  );
};

export const getUser = () => {
  if (Platform.OS === 'web') {
    return {
      id: 1,
      name: 'Demo User',
      email: 'demo@web.com',
    };
  }

  const result = db.getAllSync('SELECT * FROM user WHERE id = 1;');
  return result.length > 0 ? result[0] : null;
};