import React, {useEffect, useState} from 'react';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import Thread from './Thread';
import AddForum from './AddForum';
import ThreadCard from './ThreadCard';


export default function Forum() {

    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/discussions')
        .then((response) => setDiscussions(response.data))

    }, []); 

    const handleNewThread = () =>{
        const newThreadObj = {username: 'original poster', title: '2000s music slaps'}
        axios.post('http://localhost:9000/discussions/', newThreadObj);
        setTimeout(() => {
            window.location.reload();
          }, 500);
    }

    return (
        <>
            <Typography variant = 'h2' sx = {{fontFamily: 'circular-bold', textAlign: 'left', paddingLeft: 2}}>Forum</Typography>
            <AddForum />
            {discussions.map((talk) => (
                <ThreadCard thread = {talk} key = {talk.id}/>
            ))}
        </>
    )
}


