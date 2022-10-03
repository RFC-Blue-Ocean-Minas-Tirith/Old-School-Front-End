/* eslint-disable no-console */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { signInWithGoogle } from './firebase';

function AppNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Old School</Navbar.Brand>
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
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nav>
          <Link to="/profile_page" className="btn btn-primary me-2" type="button">Notifications</Link>
          <Link to="/profile_page" className="btn btn-primary me-2" type="button">Upload</Link>
          <Link to="/profile_page" className="btn btn-primary me-2" type="button" onClick={signInWithGoogle}>Login</Link>
          <Link to="/profile_page" className="btn btn-primary me-2" type="button">Signup</Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
