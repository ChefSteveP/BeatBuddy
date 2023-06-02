import React, { useState } from 'react';

export default function Bio({ bio, setBio, location, setLocation }) {
  const [editing, setEditing] = useState(false);

  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        {editing ? (
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, State"
          />
        ) : (
          <h2>{location}</h2>
        )}
      </div>
      <div>
        {editing ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Enter your bio"
          />
        ) : (
          <h2>{bio}</h2>
        )}
      </div>
      <button onClick={() => setEditing(!editing)}>
        {editing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
}
