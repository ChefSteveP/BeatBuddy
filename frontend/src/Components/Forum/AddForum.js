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
        <Button variant="contained"  sx={{ margin: 1, display: 'inline-flex' }}  onClick={handleClickOpen} padding={1}>
            Add Forum
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create New Forum Thread</DialogTitle>
            <DialogContent>
            <DialogContentText>
                We want to hear your voice!
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="discussion"
                label="What is your hot take/question"
                fullWidth
                type='email'
                variant="standard"
                value={title}
                onChange={handleTitle}
            />
            
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
                onClick={handleNewThread}      
                style={{ background: "white" }}
            >
                Create
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    )
}