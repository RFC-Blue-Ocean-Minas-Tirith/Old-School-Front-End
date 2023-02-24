
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import AppNavbar from './components/Navbar/AppNavbar';
import LandingPage from './components/LandingPage/LandingPage';
import ProfilePage from './components/ProfilePages/ProfilePage';
import VideoPage from './components/VideoPage/VideoPage';
import Upload from './components/Modals/Upload';
import Flagged from './components/Modals/Flagged';
import { registerIsLoggedIn } from './components/Navbar/firebase';

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [flaggedModalShow, setFlaggedModalShow] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [videoData, setVideoData] = useState('');

  function handleAddUserToDB() {
    axios.post('http://localhost:8080/user', currentUser);
  }

  function scrollToMainContent(e) {
    e.preventDefault()
    useRef("#main-content".current.scrollIntoView())
  }

  useEffect(() => {
    axios.get('http://localhost:8080/video')
      .then(res => {
        setVideoData(res.data);
        //console.log(res.data);
      })
      .catch(err => {
        console.log(err)
      });
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      handleAddUserToDB();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    registerIsLoggedIn(setIsLoggedIn, setCurrentUser);
  }, []);

  // const user = 'AllEyesBlank';

  return (
    <>
      <Link className="skip-link" onClick={scrollToMainContent}>Skip to content</Link  >
      <AppNavbar
        setModalShow={setModalShow}
        isLoggedIn={isLoggedIn}
        setVideoData={setVideoData}
        videoData={videoData}
        currentUser={currentUser}
        flaggedModalShow={flaggedModalShow}
        setFlaggedModalShow={setFlaggedModalShow}
      />
      <br />
      <br />
      <Upload
        setModalShow={setModalShow}
        modalShow={modalShow}
        currentUser={currentUser}
      />
      <Flagged
        flaggedModalShow={flaggedModalShow}
        setFlaggedModalShow={setFlaggedModalShow}
        currentUser={currentUser}
        videoData={videoData}
      />
      <section id="main-content"/>
      <Routes>
        <Route path="/" element={
          <LandingPage
            currentUser={currentUser}
            videoData={videoData}
            setVideoData={setVideoData}
          />
        } />
        <Route path="profile_page" element={<ProfilePage />} />
        <Route path="video_page" element={<VideoPage />} />
      </Routes>
    </>
  );
}

export default App;
