import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("places.db");
export function init() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places ( id TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL,img TEXT NOT NULL, address TEXT NOT NULL,lat REAL NOT NULL, long REAL NOT NULL)",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
export function adder(id, title, img, address, lat, long) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      console.log(typeof title, typeof img);
      tx.executeSql(
        `INSERT INTO places VALUES (?,?,?,?,?,?)`,
        [id, title, img, address, lat, long],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
export function fetcher() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places",
        [],
        (_, result) => {
          resolve(result.rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
