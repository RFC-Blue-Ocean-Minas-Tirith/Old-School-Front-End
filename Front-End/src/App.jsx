/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import AppNavbar from './components/Navbar/AppNavbar';
import LandingPage from './components/LandingPage/LandingPage';
import ProfilePage from './components/ProfilePages/ProfilePage';
import VideoPage from './components/VideoPage/VideoPage';
import Upload from './components/Modals/Upload';
import { registerIsLoggedIn } from './components/Navbar/firebase';

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState();

  function handleAddUserToDB() {
    axios.post('http://localhost:8080/user', currentUser);
  }

  useEffect(() => {
    if (isLoggedIn) {
      handleAddUserToDB();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    registerIsLoggedIn(setIsLoggedIn, setCurrentUser);
  }, []);

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
      <AppNavbar
        setModalShow={setModalShow}
        isLoggedIn={isLoggedIn}
      />
      <Upload setModalShow={setModalShow} modalShow={modalShow} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="profile_page" element={<ProfilePage user={user} />} />
        <Route path="video_page" element={<VideoPage />} />
      </Routes>
    </div>
    </div>
  );
}

export default App;
