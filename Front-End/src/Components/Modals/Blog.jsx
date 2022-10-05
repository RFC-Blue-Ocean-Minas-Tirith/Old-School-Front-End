/* eslint-disable */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, Heading } from './Modals.styled';
import Theme from './Theme';

export default function Blog({ blog, currentUser, toggle, show }) {
  return (
    <Theme>
      <Container>
        <Modal
          show={show}
          onHide={() => toggle(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <Heading>{blog.title}</Heading>
              <h4>{blog.username}</h4>
              <h5>{blog.date}</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {blog.description}
          </Modal.Body>
          <Modal.Footer>
            <Button id="redButton" onClick={() => { toggle(!show); }}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Theme>
  );
}
