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
              <Heading>Blog Post Title</Heading>
              <h4>L. Derly</h4>
              <h5>October 1st, 2022</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Back in my day.... Lorem ipsum dolor sit amet, vim reque expetendis eu,
              est movet sonet
              necessitatibus ei,nusquam adolescens te vis. An mea exerci eligendi.
              Deleniti intellegam efficiantur qui ei, hasea reque diceret,
              summo homero dolores est id. Rebum option perpetua ei mei,
              solum corporapercipit ne usu.
            </p>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros.
            </p>
            <p>
              Lorem ipsum dolor sit amet, vim reque expetendis eu, est movet sonet
              necessitatibus ei,nusquam adolescens te vis. An mea exerci eligendi.
              Deleniti intellegam efficiantur qui ei, hasea reque diceret,
              summo homero dolores est id. Rebum option perpetua ei mei,
              solum corporapercipit ne usu.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setModalShow(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Button variant="primary" onClick={() => setModalShow(true)}>Blog Post</Button>
      </Container>
    </Theme>
  );
}
