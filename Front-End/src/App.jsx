/* eslint-disable no-shadow */
// import { useState } from 'react';
import ProfilePage from './components/ProfilePages/ProfilePage';

function App() {
  const user = {
    firstName: 'Allie',
    lastName: 'B.',
    profilePicture: 'https://source.unsplash.com/oEcsvUfCr1c/384x192',
    username: 'AllEyesBlank',
    email: 'example@example.com',
    password: 'xcddfc',
    bio: 'I am a cool programmer and I do cool things.',
    favorites: [],
  };

  return (
    <div className="App">
      <ProfilePage user={user} />
    </div>
  );
}

export default App;
