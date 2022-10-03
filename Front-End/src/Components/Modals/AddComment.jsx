import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, StyledButton } from './Modals.styled';

function AddComment() {
  const [modalShow, setModalShow] = useState(false);
  const [comment, setComment] = useState();

  function handleComment(event) {
    setComment(event.target.value);
  }

  function handleAdd() {
    const body = {
      author: props.username,
      'comment': comment,
      date: new Date(),
    };
    axios.patch('http://localhost:8080/video', body)
      .then((results) => {
        console.log(results);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
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
            Add Comment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <textarea rows="4" cols="50" placeholder="Write your comment here..." onChange={handleComment}/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAdd}>Add</Button>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <StyledButton variant="primary" onClick={() => setModalShow(true)}>Add Comment</StyledButton>
    </Container>
  );
}

export default AddComment;
