// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const serviceAccount = require("./permissions.json");
const app = initializeApp(serviceAccount);
const db = getFirestore(app);
module.exports = db;