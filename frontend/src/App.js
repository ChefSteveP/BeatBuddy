import React from 'react';
import Login from './Components/Login/login';
import Profile from './Components/Login/profile';

function App() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  console.log('code:', code);

  return (
    <>
      {!code && <Login />}
      {code && <Profile code={code} />}
    </>
  );
}

export default App;
