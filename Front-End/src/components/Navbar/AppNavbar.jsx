/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { signInWithGoogle, signOutGoogle } from './firebase';

function AppNavbar({ setModalShow, isLoggedIn, setVideoData }) {
  const [searchTerm, setsearchTerm] = useState('');

  function handleSearchChange(e) {
    e.preventDefault();
    setsearchTerm(e.target.value);
  }

  function handleSearch() {
    console.log('searching for:', searchTerm);
    axios.get('http://localhost:8080/videos', { params: { searchTerm } })
      .then((response) => {
        console.log('video search results:', response.data);
        setVideoData(response.data);
      })
      .catch((err) => {
        console.log('err:', err);
      });
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Old School</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={() => handleSearchChange}
              />
              <Button variant="outline-success" onClick={() => handleSearch}>Search</Button>
            </Form>
          </Nav>
          <Link to="/profile_page" className="btn btn-primary me-2" type="button">Notifications</Link>
          {isLoggedIn
            ? <Button className="btn btn-primary me-2" type="button" onClick={() => setModalShow(true)}>Upload</Button>
            : <Button className="btn btn-primary me-2" type="button" onClick={signInWithGoogle}>Upload</Button>}

          {isLoggedIn
            ? <Button className="btn btn-primary me-2" type="button" onClick={signOutGoogle}>Logout</Button>
            : <Button className="btn btn-primary me-2" type="button" onClick={signInWithGoogle}>Login</Button>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
