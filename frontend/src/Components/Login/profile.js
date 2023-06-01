import React, { useState, useEffect } from 'react';

const clientId = "be50f8453cfb4ec0a40ab3fd4ad12b2e"; // Replace with your client id

export default function Profile({ code }) {
  const [profile, setProfile] = useState(null);
  const [topItems, setTopItems] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

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

    const fetchTopItems = async (token, type) => {
      const result = await fetch(`https://api.spotify.com/v1/me/top/${type}?limit=10`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!result.ok) {
        const error = await result.text();
        console.error(`Error fetching top ${type}:`, error);
        throw new Error(error);
      }

      return await result.json();
    }

    const fetchProfile = async (token) => {
      const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
      });

      if (!result.ok) {
        const error = await result.text();
        console.error('Error fetching profile:', error);
        throw new Error(error);
      }

      return await result.json();
    }

    const getUserId = async (displayName) => {
      const result = await fetch(`/people?displayName=${displayName}`);
      const users = await result.json();
      if (users.length === 0) {
        // Create a new user document in the Firestore database
        const newUser = { displayName };
        const response = await fetch('/people', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        });
        const data = await response.json();
        return data.id;
      } else {
        return users[0].id;
      }
    }


    const updateUser = async (userId) => {
      const updatedFields = {
        displayName: profile.display_name,
        topArtists: topItems.items.map(item => item.name),
        topTracks: topTracks.items.map(track => track.name)
      };
      await fetch(`/people/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      });
    }

    if (code) {
      getAccessToken().then(token => {
        fetchProfile(token).then(profile => {
          console.log('profile:', profile);
          setProfile(profile);
        });
        fetchTopItems(token, 'artists').then(items => {
          console.log('top artists:', items);
          setTopItems(items);
        });
        fetchTopItems(token, 'tracks').then(tracks => {
          console.log('top tracks:', tracks);
          setTopTracks(tracks);
        });
      }).then(() => {
        if (profile && topItems && topTracks) {
          getUserId(profile.display_name).then(userId => {
            updateUser(userId);
          });
        }
      });
    }
  }, [code]);

  if (!profile) return null;

  return (
    <section id="profile">
      <h2>Logged in as <span id="displayName">{profile.display_name}</span></h2>
      {profile.images[0] && <img src={profile.images[0].url} alt="Profile" width="200" height="200" />}
      <ul>
        <li>User ID: <span id="id">{profile.id}</span></li>
        <li>Spotify URI: <a id="uri" href={profile.external_urls.spotify}>{profile.uri}</a></li>
        <li>Link: <a id="url" href={profile.href}>{profile.href}</a></li>
        <li>Profile Image: <span id="imgUrl">{profile.images[0]?.url ?? '(no profile image)'}</span></li>
      </ul>
      {topItems && (
        <section id="top-items">
          <h2>Top Artists</h2>
          <ul>
            {topItems.items.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </section>
      )}
      {topTracks && (
        <section id="top-tracks">
          <h2>Top Tracks</h2>
          <ul>
            {topTracks.items.map(track => (
              <li key={track.id}>{track.name} by {track.artists[0].name}</li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}
