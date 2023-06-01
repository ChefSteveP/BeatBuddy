const express = require('express');
const router = express.Router();
const db = require('../../firebase');
const { getDocs, collection, addDoc, updateDoc, deleteDoc, doc, query, where } = require('firebase/firestore');
console.log('people.js loaded')

router.get('/people', async (req, res) => {
  try {
    console.log('Received GET request with data:', req.body);
    const displayName = req.query.displayName;
    const allDocData = [];
    if (displayName) {
      const q = query(collection(db, 'users'), where('displayName', '==', displayName));
      const docs = await getDocs(q);
      docs.forEach((doc) => allDocData.push({ id: doc.id, ...doc.data() }));
    } else {
      const docs = await getDocs(collection(db, 'users'));
      docs.forEach((doc) => allDocData.push({ id: doc.id, ...doc.data() }));
    }
    res.json(allDocData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/people', async (req, res) => {
  try {
    console.log('Received POST request with data:', req.body);
    const newUser = req.body;
    const docRef = await addDoc(collection(db, 'users'), newUser);
    res.json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/people/:id', async (req, res) => {
  try {
    console.log('Received PUT request with data:', req.body);
    const userId = req.params.id;
    const updatedUser = req.body;
    await updateDoc(doc(db, 'users', userId), updatedUser);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/people/:id', async (req, res) => {
  try {
    console.log('Received DELETE request with data:', req.body);
    const userId = req.params.id;
    await deleteDoc(doc(db, 'users', userId));
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
