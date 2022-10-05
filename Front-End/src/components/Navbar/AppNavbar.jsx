/* eslint-disable react/jsx-no-bind */
/* eslint-disable object-shorthand */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { signInWithGoogle, signOutGoogle } from './firebase';

function AppNavbar({ setModalShow, isLoggedIn, videoData, setVideoData, currentUser, setFlaggedModalShow }) {
  const navigate = useNavigate();
  const [searchTerm, setsearchTerm] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  function handleSearchChange(e) {
    e.preventDefault();
    setsearchTerm(e.target.value);
  }

  function handleSearch() {
    if (videoData) {
      axios.get('http://ec2-18-217-242-14.us-east-2.compute.amazonaws.com/videos', { params: { searchTerm } })
        .then((response) => {
          console.log('video search results:', response.data)
          setVideoData(response.data);
          setIsFiltered(true);
          navigate('/');
        })
        .catch((err) => {
          console.log('err:', err);
        });
    }
  }

  function checkIfAdmin() {
    if (isLoggedIn) {
      return axios.get('http://ec2-18-217-242-14.us-east-2.compute.amazonaws.com/user/data', {
        params: {
          user: currentUser.username
        }
      })
        .then((response) => {
          if (response.data.isAdmin) {
            setIsAdmin(true);
          }
        });
    }
  }

  function resetFilter() {
    setIsFiltered(false);
    document.getElementById('searchField').value = '';
    return axios.get('http://http://ec2-18-217-242-14.us-east-2.compute.amazonaws.com/video')
      .then((res) => {
        setVideoData(res.data);
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (isLoggedIn) {
      checkIfAdmin();
    }
  }, [isLoggedIn]);

  return (
    <Navbar id="nav" expand="lg">
      <Container fluid>
        <Navbar.Brand id="nav" href="/">Old School</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link id="nav" to="/" className="nav-link active" aria-current="page">Home</Link>

            {isLoggedIn
              ? <Link id="nav" to="profile_page" state={{ currentUser: currentUser, user: currentUser.username }} className="nav-link active" aria-current="page">My Profile</Link>
              : null}

            <Form className="d-flex">
              <Form.Control
                id="searchField"
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={handleSearchChange}
              />
              <Button id="whiteButton" variant="outline-success" onClick={handleSearch}>Search</Button>
            </Form>
            {isFiltered
              ? (
                <>
                  <Navbar.Text style={{ color: 'white', paddingLeft: '10px', paddingRight: '10px' }}>
                    Search results:&nbsp;
                    {videoData.length}&nbsp;
                    {videoData.length === 1 ? 'video' : 'videos'}
                  </Navbar.Text>
                  <Button type="reset" id="whiteButton" variant="outline-success" onClick={resetFilter}>Clear Search</Button>
                </>
              )
              : null}
          </Nav>

          {isLoggedIn && isAdmin
            ? <Button id="flagged" className="btn btn-primary me-2" type="button" onClick={() => setFlaggedModalShow(true)}>Review Flagged</Button>
            : null}

          {isLoggedIn
            ? <Button id="whiteButton" className="btn btn-primary me-2" type="button" onClick={() => setModalShow(true)}>Upload</Button>
            : <Button id="whiteButton" className="btn btn-primary me-2" type="button" onClick={signInWithGoogle}>Upload</Button>}

          {isLoggedIn
            ? <Button id="whiteButton" className="btn btn-primary me-2" type="button" onClick={signOutGoogle}>Logout</Button>
            : <Button id="whiteButton" className="btn btn-primary me-2" type="button" onClick={signInWithGoogle}>Login</Button>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
