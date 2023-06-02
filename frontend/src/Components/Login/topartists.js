import React from 'react';
import { useState, useEffect } from 'react';
import { getUserTopArtists } from './api';

export default function TopArtists({ token, artists, setArtists }) {
  useEffect(() => {
    if (token) {
      getUserTopArtists(token).then(artists => {
        setArtists(artists);
      });
    }
  }, [token]);

  return (
    <ul>
      {artists.map(artist => (
        <li key={artist.name}>
          {artist.name}
        </li>
      ))}
    </ul>
  );
}
