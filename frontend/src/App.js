import React from 'react';
import Login from './Components/Login/login';
import Home from './Components/Login/home';

function App() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  return (
   <>
     {code ? <Home code={code} />: <Login />}
   </>
 );
}

export default App;
