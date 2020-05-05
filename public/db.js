
// TODO: open  indexedDB
const indexedDB =
window.indexedDB ||
window.mozIndexedDB ||
window.webkitIndexedDB ||
window.msIndexedDB ||
window.shimIndexedDB;

let db;
const request = indexedDB.open("budget", 1);

// TODO: create an object store in the open db
request.onupgradeneeded = function(event) {
  const db = event.target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};
request.onsuccess = function(event) {
  db = event.target.result;

  // check if app is online before reading from db
  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function(event) {
  console.log(`Woops! ${ event.target.errorCode}`);
};

// TODO: log any indexedDB errors
// TODO: add code so that any transactions stored in the db
// are sent to the backend if/when the user goes online
// Hint: learn about "navigator.onLine" and the "online" window event.

// TODO: add code to saveRecord so that it accepts a record object for a
// transaction and saves it in the db. This function is called in index.js
// when the user creates a transaction while offline.
function saveRecord(record) {
  const transaction = db.transaction(["pending"], "readwrite");
  const store = transaction.objectStore("pending");
  store.add(record);
}
