const express = require('express');
const router = express.Router();
const db = require('../../firebase');
const { getDocs, collection, addDoc, updateDoc, deleteDoc, doc, query, where } = require('firebase/firestore');
console.log('people.js loaded')

router.get('/', async (req, res) => {
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


router.post('/', async (req, res) => {
  try {
    const ref = await addDoc(collection(db, 'users'), {
      bio: req.body.bio,
      displayName: req.body.displayName,
      username: req.body.displayName,
      isPublic: req.body.isPublic,
      location: req.body.location,
      photo: req.body.photo,
      topArtists: req.body.topArtists,
      topTracks: req.body.topTracks
    });
    console.log("Document successfully written with id ", ref.id);
    return res.status(201).json({ message: 'post successful', id: ref.id });
  } catch (error) {
    return res.status(500).json(error);
  }
});


router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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
