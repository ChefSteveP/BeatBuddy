import React from 'react';

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
    <div>
      <h1>Display your Spotify profile data</h1>
      <button onClick={redirectToAuthCodeFlow}>Login with Spotify</button>
    </div>
  );
}

