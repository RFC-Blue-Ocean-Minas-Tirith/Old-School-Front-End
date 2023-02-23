import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { signInWithGoogle, signOutGoogle } from './firebase'

function AppNavbar({ setModalShow, isLoggedIn, videoData, setVideoData, currentUser, setFlaggedModalShow }) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [isAdmin, setIsAdmin] = useState('')
  const [isFiltered, setIsFiltered] = useState(false)

  function handleSearchChange(e) {
    e.preventDefault()
    setSearchTerm(e.target.value)
  }

  function handleSearch(e) {
    e.preventDefault()
    if (videoData) {
      axios.get('http://localhost:8080/videos', { params: { searchTerm } })
        .then((response) => {
          console.log('video search results:', response.data)
          setVideoData(response.data)
          setIsFiltered(true)
          navigate('/')
        })
        .catch((err) => {
          console.log('err:', err)
        })
    }
  }

  function checkIfAdmin() {
    if (isLoggedIn) {
      return axios.get('http://localhost:8080/user/data', {
        params: {
          user: currentUser.username
        }
      })
        .then((response) => {
          if (response.data.isAdmin) {
            setIsAdmin(true)
          }
        })
    }
  }

  function resetFilter() {
    setIsFiltered(false)
    document.getElementById('nav-search-field').value = ''
    return axios.get('http://localhost:8080/video')
      .then((res) => {
        setVideoData(res.data)
        navigate('/')
        //console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (isLoggedIn) {
      checkIfAdmin()
    }
  }, [isLoggedIn])

  return (
    <Navbar id="nav" expand="xl">
      <Container fluid>
        <Navbar.Brand id="logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            {' '}
            Old School
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '320px' }}
            navbarScroll
          >
            <Link id="nav-button" to="/" className="nav-link mx-1" aria-current="page">Home</Link>

            {isLoggedIn
              ? <Link id="nav-button" to="profile_page" state={{ currentUser: currentUser, user: currentUser.username }} className="nav-link mx-1" aria-current="page">My Profile</Link>
              : null}

            <Stack direction="horizontal">
              <Form className="d-flex" onSubmit={handleSearch}>
                <Form.Control
                  id="nav-search-field"
                  type="search"
                  placeholder="Search videos & users..."
                  className="mx-2"
                  aria-label="Search"
                  onChange={handleSearchChange}
                />
                <Button id="whiteButton" size="lg" type="submit" className="mx-1">Search</Button>
              </Form>
              {isFiltered
                ? (
                  <>
                    <Navbar.Text id="nav-search-result" className="mx-2">
                      Results:&nbsp;
                      {videoData.length}&nbsp;
                      {videoData.length === 1 ? 'video' : 'videos'}
                    </Navbar.Text>
                    <div className="vr" />
                    <Button size="lg" id="whiteButton" className="mx-2" type="reset" onClick={resetFilter}>Reset</Button>
                  </>
                )
                : null}
            </Stack>
          </Nav>

          {isLoggedIn && isAdmin
            ? <Button size="lg" id="flagged" className="mx-2 my-1" type="button" onClick={() => setFlaggedModalShow(true)}>Review Flagged</Button>
            : null}

          {isLoggedIn
            ? <Button size="lg" id="whiteButton" className="mx-2 my-1" type="button" onClick={() => setModalShow(true)}>Upload</Button>
            : <Button size="lg" id="whiteButton" className="mx-2 my-1" type="button" onClick={signInWithGoogle}>Upload</Button>}

          {isLoggedIn
            ? <Button size="lg" id="whiteButton" className="mx-2 my-1" type="button" onClick={signOutGoogle}>Logout</Button>
            : <Button size="lg" id="whiteButton" className="mx-2 my-1" type="button" onClick={signInWithGoogle}>Login</Button>}
        </Navbar.Collapse>
      </Container>
    </Navbar >
  )
}

export default AppNavbar
