import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, IconButton, Box, Paper, Stack, Typography, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Thread from './Thread';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';

export default function ThreadCard({ thread }) {

    const [open, setOpen] = React.useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [likeCount, setLikeCount] = useState(0);
    const [messages, setMessages] = useState(thread.thread);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleUpvote = () => {
        axios.put('http://localhost:9000/discussions/' + thread.id + '/like');
        setLikeCount(likeCount + 1);
    }
    const handleDownVote = () => {
        axios.put('http://localhost:9000/discussions/' + thread.id + '/dislike');
        setLikeCount(likeCount - 1);
    }

    return (
        <>

            <Paper elevation={4} sx={{ padding: 2, marginBottom: 2, borderRadius: 3, fontFamily: 'circular-medium' }} >
                <Typography variant='h4' sx={{ fontFamily: 'circular-bold', textOverflow: 'ellipsis' }}>
                    bb/{thread.title}
                </Typography>
                <Button variant='contained' onClick={handleClickOpen} sx={{ backgroundColor: '#1db954', borderRadius: 5, fontFamily: 'circular-medium' }}>
                    View More
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        <DialogContentText sx={{ fontFamily: 'circular-medium' }}>
                            Keep it respectful during discourse
                        </DialogContentText>
                        <Thread thread={thread} />
                    </DialogContent>
                    <DialogActions>
                        <IconButton onClick={handleUpvote} aria-label="delete">
                            <ArrowCircleUpTwoToneIcon sx={{ fontSize: 50, color: '#1db954' }} />
                        </IconButton>
                        <Typography variant='h4' sx={{ fontFamily: 'circular-bold', textOverflow: 'ellipsis' }}>
                            {likeCount}
                        </Typography>
                        <IconButton onClick={handleDownVote} aria-label="delete">
                            <ArrowCircleDownTwoToneIcon sx={{ fontSize: 50, color: '#1db954' }} />
                        </IconButton>
                        <Button onClick={handleClose} variant='contained' sx={{ backgroundColor: '#1db954', borderRadius: 5, fontFamily: 'circular-medium' }}>
                            Leave Thread
                        </Button>

                    </DialogActions>
                </Dialog>

            </Paper>

        </>
    )
}


//Maybe Divider,