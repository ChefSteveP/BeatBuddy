// Inbox.js
import React from 'react';

import ConversationList from './ConversationList';

function Inbox() {
    const headingStyle = {
      textAlign: 'left',
      fontFamily: 'sans-serif',
      paddingLeft: '20px',  // adjust this as needed
    };
  
    return (
      <div>
        <h1 style={headingStyle}>Inbox</h1>
        <ConversationList />
      </div>
    );
  }

export default Inbox;
