import { useState, useEffect } from 'react';
import { getUserProfile } from './api';

export default function UserProfile({ token, displayName, setDisplayName, profilePictureUrl, setProfilePictureUrl }) {
  useEffect(() => {
    if (token) {
      getUserProfile(token).then(profile => {
        setDisplayName(profile.display_name);
        console.log('Updated displayName:', profile.display_name);
        if (profile.images && profile.images.length > 0) {
          setProfilePictureUrl(profile.images[0].url);
        }
      });
    }
  }, [token]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Hello {displayName}</h1>
      {profilePictureUrl && (
        <img
          src={profilePictureUrl}
          alt="Profile Picture"
          width="200"
          height="200"
          style={{ borderRadius: '50%' }}
        />
      )}
    </div>
  );
}
