const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('../../spotify.json');

const app = express();

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.use(cors());
app.use(bodyParser.json());

// API endpoints
app.get('/', (req, res) => {
    res.send('Hello from Spotify Inbox Backend!!');
});

// Fetch all conversations of a user
app.get('/conversations/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const userRef = db.collection('users').doc(userId);
        const user = await userRef.get();
        if (!user.exists) {
            res.status(404).send("User not found");
        } else {
            const conversationPromises = user.data().conversations.map(id => db.collection('conversations').doc(id).get());
            const conversations = await Promise.all(conversationPromises);
            // Fetch the user documents for the conversation members
            const conversationsWithUsernames = await Promise.all(conversations.map(async doc => {
                const conversationData = doc.data();
                const memberUsernames = [];
                for (const memberId of conversationData.members) {
                    const memberUser = await db.collection('users').doc(memberId).get();
                    memberUsernames.push(memberUser.data().username);
                }
                return { id: doc.id, members: memberUsernames };
            }));
            res.send(conversationsWithUsernames);
        }
    } catch (error) {
        console.error("Error fetching conversations: ", error);
        res.status(500).send("Error fetching conversations");
    }
});

// Fetch a single conversation
app.get('/conversations/:conversationId', async (req, res) => {
    const { conversationId } = req.params;
    try {
        const conversation = await db.collection('conversations').doc(conversationId).get();
        if (!conversation.exists) {
            res.status(404).send("Conversation not found");
        } else {
            res.send(conversation.data());
        }
    } catch (error) {
        console.error("Error fetching conversation: ", error);
        res.status(500).send("Error fetching conversation");
    }
});

// Fetch all messages of a conversation
app.get('/conversations/:conversationId/messages', async (req, res) => {
    const { conversationId } = req.params;
    try {
        const messagesSnapshot = await db.collection('conversations').doc(conversationId).collection('messages')
        .orderBy('createdAt') // add this line
        .get();
        const messages = [];
        messagesSnapshot.forEach(doc => {
            messages.push({ id: doc.id, ...doc.data() });
        });
        res.send(messages);
    } catch (error) {
        console.error("Error fetching messages: ", error);
        res.status(500).send("Error fetching messages");
    }
});


app.get('/users/byUsername/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('username', '==', username).get();

        if (snapshot.empty) {
            res.status(404).send("No user found");
            return;
        }

        snapshot.forEach(doc => {
            res.send({ id: doc.id, ...doc.data() });
        });
    } catch (error) {
        console.error("Error fetching user: ", error);
        res.status(500).send("Error fetching user");
    }
});



// Create a new conversation
app.post('/conversations', async (req, res) => {
    const { senderId, recipientId } = req.body;
    try {
        const conversation = await db.collection('conversations').add({ members: [senderId, recipientId] });
        const conversationId = conversation.id;
        await db.collection('users').doc(senderId).update({ conversations: admin.firestore.FieldValue.arrayUnion(conversationId) });
        await db.collection('users').doc(recipientId).update({ conversations: admin.firestore.FieldValue.arrayUnion(conversationId) });
        res.send({ conversationId });
    } catch (error) {
        console.error("Error creating conversation: ", error);
        res.status(500).send("Error creating conversation");
    }
});

// Create a new message in a conversation
app.post('/conversations/:conversationId/messages', async (req, res) => {
    const { conversationId } = req.params;
    const { senderId, text } = req.body;
    try {
        const message = await db.collection('conversations').doc(conversationId).collection('messages').add({
            senderId,
            text,
            createdAt: admin.firestore.FieldValue.serverTimestamp() // add this line
        });
        res.send({ messageId: message.id });
    } catch (error) {
        console.error("Error sending message: ", error);
        res.status(500).send("Error sending message");
    }
});


app.listen(9000, () => {
    console.log('Server is running on port 9000');
});
