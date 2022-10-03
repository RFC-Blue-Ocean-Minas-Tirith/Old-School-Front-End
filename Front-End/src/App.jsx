// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import VideoPage from './components/VideoPage/VideoPage';
import AddComment from './components/Modals/AddComment';
import Upload from './components/Modals/Upload';
import Blog from './components/Modals/Blog';

function App() {
  // const [state, setState] = useState(0)

  return (
    <div>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="profile_page" element={<ProfilePage />} />
        <Route path="video_page" element={<VideoPage />} />
      </Routes>
    </div>
    <AddComment />
    <Upload />
    <Blog />
    </div>
  );
}

export default App;
