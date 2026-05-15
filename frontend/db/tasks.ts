import db from './database'

export type Task = {
  id?: number;
  title: string;
  description?: string;
};

export const getTasks = (): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'SELECT * FROM tasks',
        [],
        (_: any, result: any) => {
          resolve(result.rows._array || []);
        },
        (_: any, error: any) => {
          reject(error);
          return false;
        }
      );
    });
  });
};