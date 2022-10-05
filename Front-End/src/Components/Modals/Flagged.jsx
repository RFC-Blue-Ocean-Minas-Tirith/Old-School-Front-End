import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, StyledButton, Comment } from './Modals.styled';
import Theme from './Theme';

function Flagged(props) {
  const [flagged, setFlagged] = useState();

  useEffect(() => {
    axios.get('http://ec2-3-16-44-36.us-east-2.compute.amazonaws.com:8080/flaggedComments')
      .then((results) => {
        let array = [];
        results.data.forEach((video) => {
          video.comments.forEach((comment) => {
            array.push(comment);
          });
        });
        setFlagged(array);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.flaggedModalShow]);

  function handleDelete(e) {
    let copy = flagged.slice();
    copy.splice(e.target.value, 1);
    setFlagged(copy);
    // write request to delete comment from database
  }

  function handleKeep(e) {
    let copy = flagged.slice();
    copy.splice(e.target.value, 1);
    setFlagged(copy);
    // write request to set reported to true in database
    // axios.patch('http://ec2-3-16-44-36.us-east-2.compute.amazonaws.com:8080/flaggedComments')
    //   .then((results) => {
    //     console.log(results);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  return (
    <Theme>
      <Container>
        <Modal
          show={props.flaggedModalShow}
          onHide={() => props.setFlaggedModalShow(false)}
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
            {flagged && flagged.map((item, i) => (
              <Comment key={i}>
                <p><strong>Username:</strong> {item.author}</p>
                <p><strong>Video:</strong> {item.title}</p>
                <p><strong>Comment:</strong> {item.comment}</p>
                <Button value={i} onClick={handleDelete}>Delete</Button>
                <Button value={i} onClick={handleKeep}>Keep</Button>
              </Comment>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => props.setFlaggedModalShow(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Theme>
  );
}

export default Flagged;
