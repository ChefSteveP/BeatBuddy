import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';

const currentUserID = "EvEv5DbtLHpS0Usz0Nw0";

const ConversationPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversation, setConversation] = useState(null);
  let { conversationId } = useParams();
  let navigate = useNavigate(); 

  const fetchMessages = useCallback(async () => {
    try{
      const response = await axios.get(`http://localhost:9001/conversations/${conversationId}/messages`);
      const messages = response.data;
      
      // Sort messages by createdAt timestamp
      messages.sort((a, b) => (a.createdAt.seconds > b.createdAt.seconds ? 1 : -1));

      setMessages(messages);
    } catch (err){
      console.log(err);
    }
  }, [conversationId]);

  const fetchConversation = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:9001/conversations/${currentUserID}`);
      const convs = response.data;

      const matchingConversation = convs.find(conv => conv.id === conversationId);
      if (matchingConversation) {
        setConversation(matchingConversation);
      } else {
        console.error(`No conversation found with id ${conversationId}`);
      }
    } catch (err) {
      console.log(err);
    }
  }, [conversationId]);

  useEffect(() => {
    fetchConversation();
    fetchMessages();
  }, [conversationId, fetchConversation, fetchMessages]);
  

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:9001/conversations/${conversationId}/messages`, {
        senderId: currentUserID,
        text: newMessage
      });

      setNewMessage("");
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: 'gray', color: 'white', position: 'absolute', left: 0 }}
          onClick={() => navigate('/inbox')}
        >
          Back
        </Button>
        {conversation && (
          <h1>{conversation.members.slice(1).join(', ')}</h1>
        )}
      </Box>
      {}
      {[...messages].reverse().map((message, index) => (
        <Box
          key={index}
          sx={{
            alignSelf: message.senderId === currentUserID ? 'flex-end' : 'flex-start',
            bgcolor: message.senderId === currentUserID ? '#1DB954' : '#888',
            m: 1,
            p: 1,
            borderRadius: 1,
            color: 'white',
          }}
        >
          <p>{message.text}</p>
        </Box>
      ))}
      <Box
        component="form"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 1,
        }}
        onSubmit={handleSendMessage}
      >
        <TextField
          variant="outlined"
          size="small"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ backgroundColor: 'gray', color: 'white' }}
          sx={{ ml: 1 }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );

};

export default ConversationPage;
