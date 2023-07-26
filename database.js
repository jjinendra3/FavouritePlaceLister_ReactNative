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
    //promise function used to detect errors and to run the program sequenctially
    db.transaction((tx) => {
      //transaction is one cmd in sql
      tx.executeSql(
        //executes the sql cmd each trannsaction has one cmd
        `INSERT INTO places VALUES (?,?,?,?,?,?)`, //the cmd used in sql
        [id, title, img, address, lat, long], //values in place of question marks seqentially
        (_, result) => {
          resolve(result); //succes ful result which is stored in const promise
        },
        (_, error) => {
          reject(error); //the error which wont be showed to the user and the app will continue as programmed
        }
      );
    });
  });

  return promise; //returns the succesful result or instructs the program to continue the course of action in case of error.
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
export function particular(id) {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id=?`,
        [id],
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
