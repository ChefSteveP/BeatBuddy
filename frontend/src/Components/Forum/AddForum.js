import React, {useEffect, useState} from 'react';
import { TextField, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';


export default function AddForum() {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState("");
    
    /////////////////////////////////////
    const handleTitle = (event) => {
        setTitle(event.target.value );
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleNewThread = () =>{
        const newThreadObj = {username: 'original poster', title: title}
        axios.post('http://localhost:9000/discussions/', newThreadObj);
        setTimeout(() => {
            window.location.reload();
          }, 500);
    }

    return (
        <div>
        <Button variant="contained"  sx={{display: 'inline', backgroundColor:'#1db954', margin:1, borderRadius:5, fontFamily:'circular-medium'}}  onClick={handleClickOpen} padding={1}>
            Add Forum
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create New Forum Thread</DialogTitle>
            <DialogContent>
            <DialogContentText>
                We want to hear your voice!
            </DialogContentText>
            <TextField
                margin="dense"
                id="discussion"
                label="What is your *hot take*/question?"
                fullWidth
                type='email'
                variant="standard"
                value={title}
                onChange={handleTitle}
            />
            
            </DialogContent>
            <DialogActions>
            <Button sx ={{color:'red'}}
            onClick={handleClose}>Cancel</Button>
            <Button
                onClick={handleNewThread}      
                variant = 'contained'
                sx={{backgroundColor:'#1db954', margin:1, borderRadius:5, fontFamily:'circular-medium'}}
            >
                Create
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    )
}