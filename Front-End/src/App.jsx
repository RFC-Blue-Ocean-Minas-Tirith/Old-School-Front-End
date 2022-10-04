import { useState } from 'react';

import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar/AppNavbar';
import LandingPage from './components/LandingPage/LandingPage';
import ProfilePage from './components/ProfilePages/ProfilePage';
import VideoPage from './components/VideoPage/VideoPage';
import Upload from './components/Modals/Upload';
import LiveChatPage from './components/LiveChatPage/LiveChatPage.jsx';

function App() {
  // const [state, setState] = useState(0)
  const [modalShow, setModalShow] = useState(false);
  const user = 'AllEyesBlank';
  const currentUser = {
    firstName: 'Walrus',
    lastName: 'Gumbo',
    profilePicture: 'https://source.unsplash.com/oEcsvUfCr1c/384x192',
    username: 'Walrusington',
    email: 'example@example.com',
    password: 'xcddfc',
    aboutMe: 'I am a walrus, it is pretty okay.',
    favCreator: [],
  };

  return (
    <div>
      <div className="App">
        <AppNavbar setModalShow={setModalShow} modalShow={modalShow} />
        <Upload setModalShow={setModalShow} modalShow={modalShow} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="profile_page" element={<ProfilePage user={user} currentUser={currentUser} />} />
          <Route path="video_page" element={<VideoPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
