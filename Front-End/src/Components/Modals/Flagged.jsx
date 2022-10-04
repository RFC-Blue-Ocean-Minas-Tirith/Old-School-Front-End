import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, StyledButton } from './Modals.styled';

function Flagged(props) {
  const [modalShow, setModalShow] = useState(true);
  const [flagged, setFlagged] = useState([]);

  useEffect

  return (
    <Container>
      <Modal
        show={props.show}
        onHide={props.toggleModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Flagged Comments
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {flagged.map((item) => {
            return (

            )
          })} */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <StyledButton variant="primary" onClick={() => setModalShow(true)}>Flagged</StyledButton>
    </Container>
  );
}

export default Flagged;
