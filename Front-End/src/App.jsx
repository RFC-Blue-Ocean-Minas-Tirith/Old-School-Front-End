import { useState, useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import AppNavbar from './components/Navbar/AppNavbar'
import LandingPage from './components/LandingPage/LandingPage'
import ProfilePage from './components/ProfilePages/ProfilePage'
import VideoPage from './components/VideoPage/VideoPage'
import Upload from './components/Modals/Upload'
import Flagged from './components/Modals/Flagged'
import { registerIsLoggedIn } from './components/Navbar/firebase'

function App() {
  const [modalShow, setModalShow] = useState(false)
  const [flaggedModalShow, setFlaggedModalShow] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState()
  const [videoData, setVideoData] = useState('')
  const myRef = useRef()

  const executeScroll = (e) => {
    e.preventDefault()
    myRef.current.scrollIntoView()
    myRef.current.focus()
  }

  useEffect(() => {
    axios.get('http://localhost:8080/video')
      .then((res) => {
        setVideoData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    function handleAddUserToDB() {
      axios.post('http://localhost:8080/user', currentUser)
    }

    if (isLoggedIn) {
      handleAddUserToDB()
    }
  }, [isLoggedIn, currentUser])

  useEffect(() => {
    registerIsLoggedIn(setIsLoggedIn, setCurrentUser)
  }, [])

  return (
    <>
      <Button as="a" className="skip-link" onClick={executeScroll}>Skip to content</Button>
      <AppNavbar
        setModalShow={setModalShow}
        isLoggedIn={isLoggedIn}
        setVideoData={setVideoData}
        videoData={videoData}
        currentUser={currentUser}
        flaggedModalShow={flaggedModalShow}
        setFlaggedModalShow={setFlaggedModalShow}
      />
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
      <Button ref={myRef} className="main-content-start">
        <i className="fa-solid fa-arrow-right" />
      </Button>
      <Routes>
        <Route
          path="/"
          element={(
            <LandingPage
              currentUser={currentUser}
              videoData={videoData}
              setVideoData={setVideoData}
            />
          )}
        />
        <Route path="profile_page" element={<ProfilePage />} />
        <Route path="video_page" element={<VideoPage />} />
      </Routes>
    </>
  )
}

export default App
