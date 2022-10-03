// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar/AppNavbar';
import LandingPage from './components/LandingPage/LandingPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import VideoPage from './components/VideoPage/VideoPage';

function App() {
  // const [state, setState] = useState(0)

  return (
    <div className="App">
      <AppNavbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="profile_page" element={<ProfilePage />} />
        <Route path="video_page" element={<VideoPage />} />
      </Routes>
    </div>
  );
}

export default App;
