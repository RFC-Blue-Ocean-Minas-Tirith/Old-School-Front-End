import { useState } from 'react';

import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar/AppNavbar';
import LandingPage from './components/LandingPage/LandingPage';
import ProfilePage from './components/ProfilePages/ProfilePage';
import VideoPage from './components/VideoPage/VideoPage';
import Upload from './components/Modals/Upload';
import Flagged from './components/Modals/Flagged'

function App() {
  // const [state, setState] = useState(0)
  const [modalShow, setModalShow] = useState(false);
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
    <div>
    <div className="App">
      <AppNavbar setModalShow={setModalShow} modalShow={modalShow} />
      <Upload setModalShow={setModalShow} modalShow={modalShow} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="profile_page" element={<ProfilePage user={user} />} />
        <Route path="video_page" element={<VideoPage />} />
      </Routes>
    </div>
    <Flagged />
    </div>
  );
}

export default App;
