import React, { useState, useEffect } from 'react';
import TopTracks from "./toptracks"
import TopArtists from "./topartists"
import Username from "./username"
import Bio from "./bio"
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const clientId = "be50f8453cfb4ec0a40ab3fd4ad12b2e"; // Replace with your client id

export default function Home({ code }) {
  
    const [token, setToken] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [topTracks, setTopTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);

    useEffect(() => {
      async function fetchUserData() {
        if (displayName) {
          const response = await fetch(`http://localhost:9000/people?displayName=${displayName}`);
          const data = await response.json();
          const user = data[0];
          if (user) {
            setBio(user.bio);
            setLocation(user.location);
          }
        }
      }
      fetchUserData();
    }, [displayName]);
    

  const handleToggle = () => {
    setIsPrivate(!isPrivate);
  }

  const setDisplayNameWithLog = (newDisplayName) => {
    setDisplayName(newDisplayName);
   }

  useEffect(() => {
    const getAccessToken = async () => {
      const verifier = localStorage.getItem("verifier");

      const params = new URLSearchParams();
      params.append("client_id", clientId);
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", "http://localhost:3000/callback");
      params.append("code_verifier", verifier);

      const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
      });

      if (!result.ok) {
        const error = await result.text();
        console.error('Error getting access token:', error);
        throw new Error(error);
      }

      const { access_token } = await result.json();
      return access_token;
    }

    getAccessToken().then(t => setToken(t))
  }, []);

  useEffect(() => {
    async function checkAndUpdateUser() {
      // Check if user already exists in database
      const response = await fetch(`http://localhost:9000/people?displayName=${displayName}`);
      const data = await response.json();
      const user = data[0];
  
      // Collect data from child components
      const bioData = bio; // get bio data from state
      const displayNameData = displayName; // get displayName data from state
      const username = displayName; // get username data
      const isPublicData = !isPrivate; // get isPublic data from state
      const locationData = location; // get location data from state
      const photoData = profilePictureUrl; // get photo data from state
      const topArtistsData = topArtists; // get topArtists data from state
      const topTracksData = topTracks; // get topTracks data from state
  
      // Create request body
      const requestBody = {
        bio: bioData,
        displayName: displayNameData,
        username,
        isPublic: isPublicData,
        location: locationData,
        photo: photoData,
        topArtists: topArtistsData,
        topTracks: topTracksData
      };

      if (user) {
        // User already exists in database, update existing document
        await fetch(`http://localhost:9000/people/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });
      } else {
        // User does not exist in database, create new document
        await fetch('http://localhost:9000/people', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });
      }
    }
  
    if (token) {
      checkAndUpdateUser();
    }
  }, [token, bio, displayName, isPrivate, location, profilePictureUrl, topArtists, topTracks]);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 10 }}>
    <Grid container spacing={4}>
    <Grid item xs={12} sm={6} sx={{ minHeight: '100%', marginTop: 0 }}>
    {token && (
    <>
    <Username
    token={token}
    displayName={displayName}
    setDisplayName={setDisplayNameWithLog}
    profilePictureUrl={profilePictureUrl}
    setProfilePictureUrl={setProfilePictureUrl}
    />
    <Bio bio={bio} setBio={setBio} location={location} setLocation={setLocation} />
    </>
    )}
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
    <Button variant="contained" onClick={handleToggle} sx={{ fontFamily: 'circular-medium' }} style={{ backgroundColor: '#1DB954' }}>
    {isPrivate ? 'Switch to Public' : 'Switch to Private'}
    </Button>
    </Box>
    </Grid>
    <Grid item xs={12} sm={6} sx={{ minHeight: '100%', marginTop: 4}}>
    <Typography variant="h5" component="div" gutterBottom sx={{ fontFamily: 'circular-medium' }}>
    Top Tracks
    </Typography>
    {token && <TopTracks token={token} tracks={topTracks} setTracks={setTopTracks} />}
    <Typography variant="h5" component="div" gutterBottom sx={{ fontFamily: 'circular-medium' }}>
    Top Artists
    </Typography>
    {token && <TopArtists token={token} artists={topArtists} setArtists={setTopArtists} />}
    </Grid>
    </Grid>
    </Container>
   );
   
}
