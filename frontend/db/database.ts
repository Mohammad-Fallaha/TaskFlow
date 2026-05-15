import { Platform } from 'react-native';

const db =
  Platform.OS === 'web'
    ? require('./database.web').db
    : require('./native').db;

export default db;