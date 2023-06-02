import React, {useEffect, useState} from 'react';
import {Typography, Container } from '@mui/material';
import axios from 'axios';
import AddForum from './AddForum';
import SearchBar from './SearchBar';


export default function Forum() {

    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/discussions')
        .then((response) => setDiscussions(response.data))

    }, []); 

    /**
     * {discussions.map((talk) => (
                <ThreadCard thread = {talk} key = {talk.id}/>
            ))}
     */
    return (
        <Container sx = {{margin: 'auto'}}>
            <Typography variant = 'h2' sx = {{fontFamily: 'circular-bold', textAlign: 'left', paddingLeft: 2}}>Forum</Typography>
            <AddForum />
            <SearchBar discussions={discussions}/>
            
        </Container>
    )
}


