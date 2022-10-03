import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, Heading } from './Modals.styled';
import Theme from './Theme';

export default function Blog(props) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <Theme>
      <Container>
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              <Heading>{props.blog.title}</Heading>
              <h4>{props.currentUser}</h4>
              <h5>{props.blog.date}</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {props.blog.description}
          </Modal.Body>
          <Modal.Footer>
            {/* <Button onClick={() => setModalShow(false)}>Close</Button> */}
            {/* not sure if this is how I should do it... */}
            <Button onClick={props.setModal(!props.modal)}>Close</Button>
          </Modal.Footer>
        </Modal>
        {/* <Button variant="primary" onClick={() => setModalShow(true)}>Blog Post</Button> */}
      </Container>
    </Theme>
  );
}
