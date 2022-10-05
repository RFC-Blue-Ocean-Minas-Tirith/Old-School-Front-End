import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, StyledButton } from './Modals.styled';

function AddComment({ currUser, videoID, toggleModal, show, addComment}) {
  const [comment, setComment] = useState();

  function handleComment(event) {
    setComment(event.target.value);
  }

  function handleAdd() {
    const params = {
      params: {
        username: currUser,
        'comment': comment,
        date: new Date(),
        id: videoID,
      },
    };
    axios.patch('http://ec2-3-16-44-36.us-east-2.compute.amazonaws.com:8080/video', params)
      .then((results) => {
        console.log(results);
        toggleModal();
        setComment();
      })
      .catch((err) => {
        console.log(err);
      });
    addComment(params.params);
  }

  return (
    <Container>
      <Modal
        show={show}
        onHide={() => toggleModal()}
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
            <textarea rows="4" cols="50" placeholder="Write your comment here..." onChange={handleComment} />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAdd}>Add</Button>
          <Button onClick={toggleModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AddComment;
