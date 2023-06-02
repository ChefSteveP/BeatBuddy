import React, {useState} from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Stack, Typography} from '@mui/material';





export default function Thread ({thread}){


    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState(thread.thread);

    const handleNewMessage = () => {
        const newMessageObj = {username:"demoName", message : newMessage};
        axios.put('http://localhost:9000/discussions/'+thread.id, newMessageObj);
        setMessages((msg) => [...msg,newMessageObj]);
        setNewMessage("");
        
    }
    return (
    <> 
        <Typography variant = 'h4' sx={{fontFamily: 'circular-bold'}}>bb/{thread.title}</Typography> 
        <Stack spacing = {2} sx ={{margin : 2}}>
            {messages.map((msg,index) => (
                <Paper elevation = {2} sx={{padding: 2, borderRadius:1, fontFamily: 'circular-medium'}} key={index}>
                    <Typography sx={{fontFamily: 'circular-medium', textAlign: 'left'}}>{msg.username} </Typography>
                    <Typography sx={{fontFamily: 'circular-medium', textAlign: 'right'}}>{msg.message}</Typography>
                </Paper>
            ))}
        </Stack>
        
        <TextField 
        label="Add to thread" 
        value = {newMessage}
        onChange = {(e) => setNewMessage(e.target.value)} ></TextField>
        <Button sx={{backgroundColor:'#1db954', borderRadius:5, fontFamily:'circular-medium'}} variant = "contained"
        onClick ={handleNewMessage}>Submit</Button>
    </>
    )
}


//Maybe Divider,