import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const clientId = "be50f8453cfb4ec0a40ab3fd4ad12b2e"; // Replace with your client id

export default function Login() {
 const redirectToAuthCodeFlow = async () => {
 //console.log('redirectToAuthCodeFlow called');
 const verifier = generateCodeVerifier(128);
 //console.log('verifier:: ', verifier);
 const challenge = await generateCodeChallenge(verifier);
 console.log('challenge:', challenge)

 localStorage.setItem("verifier", verifier);

 const params = new URLSearchParams();
 params.append("client_id", clientId);
 params.append("response_type", "code");
 params.append("redirect_uri", "http://localhost:3000/callback");
 params.append("scope", "user-read-private user-read-email user-top-read");
 params.append("code_challenge_method", "S256");
 params.append("code_challenge", challenge);

 document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
 }

 const generateCodeVerifier = (length) => {
 let text = '';
 let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

 for (let i = 0; i < length; i++) {
 text += possible.charAt(Math.floor(Math.random() * possible.length));
 }
 return text;
 }

 const generateCodeChallenge = async (codeVerifier) => {
 const data = new TextEncoder().encode(codeVerifier);
 const digest = await window.crypto.subtle.digest('SHA-256', data);
 return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
 .replace(/\+/g, '-')
 .replace(/\//g, '_')
 .replace(/=+$/, '');
 }

 return (
  <Container maxWidth="sm">
  <Box sx={{ fontFamily: 'circular-medium', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10 }}>
  <Typography sx= {{ fontFamily: 'circular-medium' }} variant="h3" component="div" gutterBottom>
  Beat Buddy
  </Typography>
  <Typography sx= {{ fontFamily: 'circular-medium' }} variant="h5" component="div" gutterBottom align="center">
  Social Media for Spotify users to chat with each other and discuss all things music.
  </Typography>
  <Button sx= {{ fontFamily: 'circular-medium' }} variant="contained" onClick={redirectToAuthCodeFlow} style={{ backgroundColor: '#1DB954' }}>Login with Spotify</Button>
  </Box>
  </Container>
 );
 
 
 
}
