const express = require('express');
const router = express.Router();
const db = require('../../firebase');
const { collection, query, where, getDocs } = require("firebase/firestore");

router.get('/', async function (req, res, next) {
    console.log(req.query);
    let q;
    //TODO add username search with 'or'
    if (req.query?.search) {
        q = query(collection(db, 'users'),
            where('displayName', '>=', req.query.search),
            where('displayName', '<=', req.query.search + '\uf8ff'),
            where('isPublic', '==', true));
    } else if (req.query?.location) {
        q = query(collection(db, 'users'), where('location', '==', req.query.location), where('isPublic', '==', true));
    } else if (req.query?.artist) {
        q = query(collection(db, 'users'), where('topArtists', 'array-contains', req.query.artist), where('isPublic', '==', true));
    } else if (req.query?.song) {
        q = query(collection(db, 'users'), where('topTracks', 'array-contains', req.query.song), where('isPublic', '==', true));
    } else {
        q = query(collection(db, 'users'), where('isPublic', '==', true));
    }
    let userArray = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        userArray.push({ id: doc.id, data: doc.data() });
    });
    res.send(userArray);
});

module.exports = router;
