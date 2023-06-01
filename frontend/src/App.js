import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Inbox from './Components/Inbox/Inbox';
import ConversationPage from './Components/Inbox/ConversationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/conversations/:conversationId" element={<ConversationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
