import React, {useState} from 'react';
import axios from 'axios';
import { TextField, Button, Box, Paper, Stack, Typography, Card, CardContent,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import Thread from './Thread';
export default function ThreadCard ({thread}){

    const [open, setOpen] = React.useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState(thread.thread);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
   
    return (
    <> 
        
        <Paper elevation = {4} sx={{ width: 1/2, padding: 2, margin:4,borderRadius:3, fontFamily: 'circular-medium'}} >
                <Typography variant = 'h4' sx={{fontFamily: 'circular-bold'}}>
                    bb/{thread.title}
                </Typography>
                    <Button onClick={handleClickOpen}>
                            View More
                    </Button>  
                    <Dialog open={open} onClose={handleClose}>
                        <DialogContent>
                        <DialogContentText sx = {{fontFamily: 'circular-medium'}}>
                            Keep it respectful during discourse
                        </DialogContentText>
                        <Thread thread ={thread}/>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Leave Thread</Button>
                        
                        </DialogActions>
                    </Dialog>                
                
          </Paper>
    
    </>
    )
}


//Maybe Divider,