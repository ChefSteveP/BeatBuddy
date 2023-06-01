import { useEffect, useState } from "react";
import axios from "axios";
import UserCarousel from "./UserCarousel";
import '../../App.css';

//TODO implement current user view
const currentUserID = "";

function Discover() {
    const [searchResults, setSearchResults] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [userCarousels, setUserCarousels] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:9000/discover',
                headers: {}
            };

            try {
                const response = await axios.request(config);
                setAllUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        //Create 4 carousels: 1 location, 2 for artists, and 1 for songs
        //TODO make not hard-coded
        const populateCarousels = async () => {
            setUserCarousels([
                <UserCarousel key='location' displayText="Users near Montreal, Canada" users={await getQueryResults('location', /* currentUser location*/ 'Montreal, Canada')} />,
                <UserCarousel key='artist1' displayText="Users who also like Taylor Swift" users={await getQueryResults('artist', /* currentUser top artist*/ 'Taylor Swift')} />,
                <UserCarousel key='artist2' displayText="Users who also listen to Michael Jackson" users={await getQueryResults('artist', /* currentUser top artist*/ 'Michael Jackson')} />,
                <UserCarousel key='song' displayText="Users who also play &quot;Blame Canada (South Park)&quot;" users={await getQueryResults('song', /* currentUser top artist*/ 'Blame Canada (South Park)')} />
            ]);
        }
        populateCarousels();
        getAllUsers();
    }, []);

    //TODO make search not case-sensitive
    const getQueryResults = async (parameter, search) => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:9000/discover?${parameter}=${search}`,
            headers: {}
        };

        try {
            const response = await axios.request(config);
            return response.data;
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    return (
        <>
            <h1>Discover</h1>
            <input onChange={async (e) => {
                setSearchResults(e.target.value !== "" ? await getQueryResults('search', e.target.value) : [])
            }} placeholder="Search for a user here" />
            <UserCarousel displayText="Search Results" users={searchResults} />
            {userCarousels.sort(() => Math.random() - 0.5)}
            <UserCarousel displayText="All Users" users={allUsers} />
        </>
    );
}

export default Discover;