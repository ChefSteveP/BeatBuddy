import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

const currentUser = 'EvEv5DbtLHpS0Usz0Nw0';
export const ConversationList = ({ userId }) => {
    const [conversations, setConversations] = useState([]);
    const [newUserName, setNewUserName] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    const fetchConversations = async () => {
      const response = await axios.get(`http://localhost:9001/conversations/${currentUser}`);
      const convs = response.data;
      setConversations(convs);
    }
  
    useEffect(() => {
      fetchConversations();
    }, [userId]);

    const openDialog = () => {
      setDialogOpen(true);
    };

    const closeDialog = () => {
      setDialogOpen(false);
      setNewUserName("");
    }

    const handleNewConversation = async () => {
        closeDialog();
        try {
          const response = await axios.get(`http://localhost:9001/users/byUsername/${newUserName}`);
          
          const newUserId = response.data.id;
    
          await axios.post('http://localhost:9001/conversations', { senderId: currentUser, recipientId: newUserId })
            .then((response) => {
              const { conversationId } = response.data;
              setConversations([...conversations, { id: conversationId, members: [newUserName] }]);
            })
            .catch((error) => {
              console.error("Error creating conversation: ", error);
            });
        } catch (err) {
          console.log('Error fetching user: ', err);
        }
    }

    return (
        <div className="ConversationList" style={{ display: 'flex', flexDirection: 'column' }}>
          <Button
            variant="contained"
            onClick={openDialog}
            style={{
                backgroundColor: '#1DB954',
                color: 'white',
                marginBottom: '10px',
                position: 'absolute',
                top: '90px',
                right: '10px',
                fontFamily: 'circular-medium',
            }}
          >
            Start new conversation
          </Button>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            {conversations.map((conversation, index) => (
              <div key={index} style={{ width: '50%', marginBottom: '10px' }}>
                <Button
                  variant="contained"
                  component={Link}
                  to={`/conversations/${conversation.id}`}
                  style={{
                    backgroundColor: '#1DB954',
                    color: 'white',
                    width: '100%',
                    textAlign: 'left',
                    fontFamily: 'circular-medium',
                  }}
                >
                  {conversation.members.slice(1).join(', ')}
                </Button>
              </div>
            ))}
          </div>
    
          <Dialog open={dialogOpen} onClose={closeDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Conversation</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To start a new conversation, please enter the username of the user you want to start a conversation with.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Username"
                type="text"
                fullWidth
                value={newUserName}
                onChange={e => setNewUserName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog} color="primary" style={{ fontFamily: 'circular-medium' }}>
                Cancel
              </Button>
              <Button onClick={handleNewConversation} style={{ backgroundColor: '#1DB954', color: 'white', fontFamily: 'circular-medium' }}>
                Start
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    );
    };
    
export default ConversationList;
