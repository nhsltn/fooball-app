import {
  openDB
} from 'idb';
import {
  elements
} from '../views/base';

const dbPromised = openDB("bola", 1, {
  upgrade(db, oldVersion, newVersion, transaction) {
    if (oldVersion <= 1) {
      const clubsObjectStore = db.createObjectStore("clubs", {
        keyPath: "id"
      });
      clubsObjectStore.createIndex("name", "name", {
        unique: false
      });
      const fixturesObjectStore = db.createObjectStore("fixtures", {
        keyPath: "id"
      });
      fixturesObjectStore.createIndex("utcDate", "utcDate", {
        unique: false
      });
    }
  }
});

export function saveTeamDB(clubs) {
  return dbPromised
    .then(async function (db) {
      const tx = db.transaction("clubs", "readwrite");
      await Promise.all([
        tx.store.add(clubs),
        tx.done
      ]);
    }).then(function () {
      console.log("club disimpan");
    });
};

export function deleteTeamDB(id) {
  return dbPromised
    .then(async function (db) {
      const tx = db.transaction("clubs", "readwrite");
      await Promise.all([
        tx.store.delete(id),
        tx.done
      ]);
      console.log("match dihapus");
    })
};

export function getTeamDB() {
  return dbPromised
    .then(async function (db) {
      const tx = db.transaction("clubs", "readonly");
      const clubs = tx.objectStore("clubs").getAll();
      return await clubs;
    })
}

export function saveMatchDB(fixtures) {
  return dbPromised
    .then(async function (db) {
      const tx = db.transaction("fixtures", "readwrite");
      await Promise.all([
        tx.store.add(fixtures),
        tx.done
      ]);
      console.log(fixtures);
      console.log("match disimpan");
    })
};

export function deleteMatchDB(id) {
  return dbPromised
    .then(async function (db) {
      const tx = db.transaction("fixtures", "readwrite");
      await Promise.all([
        tx.store.delete(id),
        tx.done
      ]);

      console.log("match dihapus");
    })
};

export function getMatchDB() {
  return dbPromised
    .then(async function (db) {
      const tx = db.transaction("fixtures", "readonly");
      const fixtures = tx.objectStore("fixtures").getAll();
      return await fixtures;
    })
}

export function isMatchSaved(id) {
  return dbPromised
    .then(async function (db) {
      const tx = db.transaction("fixtures", "readonly");
      const fixtures = tx.objectStore("fixtures").getAllKeys(); // get keypath berupa id dari indexeddb
      const keypathID = (await fixtures);
      return keypathID.findIndex(element => element === id) !== -1;
    });
}

export function isTeamSaved(id) {
  return dbPromised
    .then(async function (db) {
      const tx = db.transaction("clubs", "readonly");
      const clubs = tx.objectStore("clubs").getAllKeys(); // get keypath berupa id dari indexeddb
      const keypathID = (await clubs);
      return keypathID.findIndex(element => element === id) !== -1;
    });
}