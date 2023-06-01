var express = require('express');
var router = express.Router();
const db = require('../../firebase');

const {doc, getDocs, collection, addDoc, updateDoc,arrayUnion, deleteDoc, serverTimestamp } = require('firebase/firestore');

/* GET all discussions. */
router.get('/', async(req, res) =>{
    try {
        let query = await getDocs(collection(db,'discussions'));
        let response = [];
        query.forEach((doc) => response.push({...doc.data(),id : doc.id}));
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
});


//POST new discussion
router.post('/', async(req,res) => {
    try {
        const ref = await addDoc(collection(db,'discussions'), {
            originTime : serverTimestamp(),
            poster : req.body.username,
            title : req.body.title,
            thread : []
        })
        console.log("Document sucessfully written with id ", ref.id)
        return res.status(201).json({message: 'post succesful', id: ref.id})
    } catch (error) {
        return res.status(500).json(error);
    }
});
//PUT, add comment to already existing discussion
router.put('/:discussionId',async (req, res) => {
    
    try{
        const {username, message}= req.body;
        const id = req.params.discussionId;
        const docRef = doc(db,'discussions', id);

        const newMessage = {
            //time: serverTimestamp(),
            message: message,
            username: username,};
            
        await updateDoc(docRef, {
            thread: arrayUnion(newMessage)
        })    

        res.status(200).json({message: 'new comment added to thread with id: ' + {id}})
    }catch (error){
        res.status(500).json(error);
    }
})
//Delete discussion w/ admin priveleage


module.exports = router;
