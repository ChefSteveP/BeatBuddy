import React from 'react';
import { useState, useEffect } from 'react';
import { getUserTopTracks } from './api';

export default function TopTracks({ token, tracks, setTracks }) {
  useEffect(() => {
    if (token) {
      getUserTopTracks(token).then(tracks => {
        setTracks(tracks);
      });
    }
  }, [token]);

  return (
    <ul>
      {tracks.map(track => (
        <li key={track.name}>
          {track.name} by {track.artist}
        </li>
      ))}
    </ul>
  );
}
