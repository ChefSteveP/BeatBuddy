import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Inbox from './Components/Inbox/Inbox';
import ConversationPage from './Components/Inbox/ConversationPage';
import NavBar from './Components/Login/NavBar';
import Login from './Components/Login/login';
import Home from './Components/Login/home';
import Forum from './Components/Forum/Forum';
import './App.css';
import Discover from './Components/Discover/Discover';

function App() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  return (
    <>
      <Router>
        <NavBar />
        {code ? <></> : <Login />}
        <Routes>
          <Route path="/myProfile" element={<Home code={code} />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/conversations/:conversationId" element={<ConversationPage />} />
          {/*<Route path="/home" element={<Home />} />*/}
          {/* add routes for other pages here */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
