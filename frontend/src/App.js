import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Inbox from './Components/Inbox/Inbox';
import ConversationPage from './Components/Inbox/ConversationPage';
import NavBar from './Components/Login/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/conversations/:conversationId" element={<ConversationPage />} />
        {/* add routes for other pages here */}
      </Routes>
    </Router>
  );
}

export default App;
