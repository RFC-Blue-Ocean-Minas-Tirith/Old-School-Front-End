import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, Comment } from './Modals.styled';
import Theme from './Theme';

function Flagged(props) {
  const [flagged, setFlagged] = useState();

  useEffect(() => {
    axios.get('http://localhost:8080/flaggedComments')
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
    const params = {
      params: {
        'comment': flagged[e.target.value].comment,
        id: flagged[e.target.value]._id,
      },
    };
    console.log(params);
    // needs work
    axios.patch('http://localhost:8080/flaggedComments', params)
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleKeep(e) {
    let copy = flagged.slice();
    copy.splice(e.target.value, 1);
    setFlagged(copy);
    // write request to set reported to true in database
    // axios.patch('http://localhost:8080/flaggedComments')
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
                <Button id="redButton" value={i} onClick={handleDelete}>Delete</Button>
                <Button id="redButton" value={i} onClick={handleKeep}>Keep</Button>
              </Comment>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button id="redButton" onClick={() => props.setFlaggedModalShow(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Theme>
  );
}

export default Flagged;
