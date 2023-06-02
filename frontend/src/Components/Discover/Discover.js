import { useEffect, useState } from "react";
import { TextField, Typography, Box } from "@mui/material";
import { Search } from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';
import axios from "axios";
import UserCarousel from "./UserCarousel";
import '../../App.css';
import { ThemeProvider } from "@emotion/react";
import NavBar from "../Login/NavBar";

//TODO implement current user view
//const currentUserID = "Cp8eWVG9JevZU6mN8fxw";

function Discover() {
    const [searchResults, setSearchResults] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [userCarousels, setUserCarousels] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const customTheme = createTheme({
        palette: {
            primary: {
                main: '#1DB954'
            }
        }
    });


    //SCROLLINg STUFF - clean up
    const [scrollingUp, setScrollingUp] = useState(false);

    useEffect(() => {
        const threshold = 0;
        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const updateScrollDir = () => {
            const scrollY = window.pageYOffset;

            if (Math.abs(scrollY - lastScrollY) < threshold) {
                ticking = false;
                return;
            }
            setScrollingUp(scrollY > lastScrollY ? false : true);
            lastScrollY = scrollY > 0 ? scrollY : 0;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDir);
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll);

        if (scrollingUp && document.getElementsByClassName('discover-header'))
            document.getElementsByClassName('discover-header')[0].style.top = '0';
        else
            document.getElementsByClassName('discover-header')[0].style.top = '-300px';

        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollingUp]);

    //END SCROLLING STUFF


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

        //TODO make not hard-coded
        const populateCarousels = async () => {
            const location = 'Montreal, Canada';
            const artist1 = 'Taylor Swift';
            const artist2 = 'Michael Jackson';
            const song = "You've Got Your Whole Life Ahead of You";
            setUserCarousels([
                <div style={{ backgroundColor: '#FF4632', position: 'sticky', color: 'white' }}><UserCarousel key='location' displayText='Users near ' specialInfo={location} users={await getQueryResults('location', location)} backgroundColor={'#C3F0C8'} /></div>,
                <div style={{ backgroundColor: '#2d46b9', position: 'sticky', color: 'white' }}><UserCarousel key='artist1' displayText="Users who also like " specialInfo={artist1} users={await getQueryResults('artist', artist1)} /></div>,
                <div style={{ backgroundColor: '#C3F0C8', position: 'sticky' }}><UserCarousel key='artist2' displayText="Users who also listen to " specialInfo={artist2} users={await getQueryResults('artist', artist2)} backgroundColor={'#ffcdcd'} /></div>,
                <div style={{ backgroundColor: '#ffcdd2', position: 'sticky', color: 'white' }}><UserCarousel key='song' displayText="Users who also play " specialInfo={song} users={await getQueryResults('song', song)} /></div>
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
        <div className="Discover">
            <div className="discover-header">
                <NavBar />
                <Typography variant='h2' sx={{ fontFamily: 'circular-bold', textAlign: 'left', paddingLeft: 2, paddingTop: 3 }}>Discover</Typography>
                <ThemeProvider theme={customTheme}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', paddingLeft: 2, paddingBottom: 5, paddingTop: 4 }}>
                        <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField sx={{ "color:active": '#1DB954' }} label="Search for a user" variant="standard" onKeyUp={async (e) => {
                            setSearchResults(e.target.value !== "" ? await getQueryResults('search', e.target.value) : []);
                            if (e.target.value !== "")
                                setIsSearching(true);
                            else
                                setIsSearching(false);
                        }} />
                    </Box>
                </ThemeProvider>
            </div>
            <div hidden={!isSearching}>
                <UserCarousel displayText="Search Results" specialInfo={''} users={searchResults} backgroundColor={'#C3F0C8'} />
            </div>
            <div hidden={isSearching}>
                {userCarousels.sort(() => Math.random() - 0.5)}
                <div style={{ backgroundColor: '#cbcbcb' }}><UserCarousel displayText="All Users" specialInfo={''} users={allUsers} backgroundColor={'#C3F0C8'} /></div>
            </div>
        </div >
    );
}

export default Discover;