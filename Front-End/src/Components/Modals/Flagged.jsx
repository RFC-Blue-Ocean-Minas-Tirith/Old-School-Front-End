/* eslint-disable */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import { Container, Comment, Column, Row } from './Modals.styled';
import Theme from './Theme';
import { serviceID, templateID, publicKey } from './config';

function Flagged(props) {
  const [flagged, setFlagged] = useState();
  const [flaggedVideos, setFlaggedVideos] = useState();

  useEffect(() => {
    axios.get('http://ec2-18-217-242-14.us-east-2.compute.amazonaws.com/flaggedComments')
      .then((results) => {
        let array = [];
        results.data.forEach((video) => {
          video.comments.forEach((comment) => {
            if (comment.isReported) {
              comment.title = video.title;
              comment.videoId = video._id;
              array.push(comment);
            }
          });
        });
        setFlagged(array);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.flaggedModalShow]);

  useEffect(() => {
    axios.get('http://ec2-18-217-242-14.us-east-2.compute.amazonaws.com/flaggedVideos')
      .then((results) => {
        setFlaggedVideos(results.data);
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
        id: flagged[e.target.value].videoId,
      },
    };
    axios.patch('http://ec2-18-217-242-14.us-east-2.compute.amazonaws.com/flaggedComments', params)
      .then((results) => {
        console.log(results);
        return axios.get('http://ec2-18-217-242-14.us-east-2.compute.amazonaws.com/user/data', {
          params: {
            user: flagged[e.target.value].author
          }
        })
          .then ((results) => {
            let templateParams = {
              currentUser: results.data.email,
              username: results.data.username,
              video: flagged[e.target.value].title,
              comment: flagged[e.target.value].comment
            }
            console.log('template params', templateParams);
            emailjs.send(serviceID, templateID, templateParams, publicKey)
              .then((result) => {
                console.log('email sent!', result.status, result.text);
              }, (error) => {
                  console.log('error', error);
              });
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleKeep(e) {
    let copy = flagged.slice();
    copy.splice(e.target.value, 1);
    setFlagged(copy);
    const params = {
      params: {
        'comment': flagged[e.target.value].comment,
        id: flagged[e.target.value].videoId,
        commentID: flagged[e.target.value]._id
      },
    };
    axios.patch('http://ec2-18-217-242-14.us-east-2.compute.amazonaws.com/flaggedCommentsKeep', params)
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleVideoDelete(e) {
    let copy = flaggedVideos.slice();
    copy.splice(e.target.value, 1);
    setFlaggedVideos(copy);
    const params = {
      params: {
        id: flaggedVideos[e.target.value]._id,
      },
    };
    axios.patch('http://ec2-18-217-242-14.us-east-2.compute.amazonaws.com/flaggedVideos', params)
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleVideoKeep(e) {
    let copy = flaggedVideos.slice();
    copy.splice(e.target.value, 1);
    setFlaggedVideos(copy);
    const params = {
      params: {
        id: flaggedVideos[e.target.value]._id,
      },
    };
    axios.patch('http://ec2-18-217-242-14.us-east-2.compute.amazonaws.com/flaggedVideosKeep', params)
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.log(err);
      });
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
          <Modal.Header id="contained-modal-title-vcenter" closeButton>
            <Modal.Title >
              Flagged Videos
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup
                variant="flush"
              >
            {flaggedVideos && flaggedVideos.map((item, i) => (
              <ListGroup.Item as="li" key={i}>
                <Row>
                <Column>
                <div><strong>Username:</strong> {item.username}</div>
                <div className="flaggedRow"><strong>Video:</strong>
                <Link to="/video_page" className="nav-link active" aria-current="page" state={{ 'currentUser': props.currentUser, 'video': props.videoData[i] }} onClick={() => props.setFlaggedModalShow(false)}><h6 id="link">{item.title}</h6></Link></div>
                </Column>
                <Column>
                <Button id="redButtonFlag" value={i} onClick={handleVideoDelete}>Delete</Button>
                <Button id="redButtonFlag" value={i} onClick={handleVideoKeep}>Keep</Button>
                </Column>
                </Row>
                </ListGroup.Item>
            ))}
            </ListGroup>
          </Modal.Body>
          <Modal.Header id="contained-modal-title-vcenter2" closeButton>
            <Modal.Title >
              Flagged Comments
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup
              variant="flush"
            >
            {flagged && flagged.map((item, i) => (
              <ListGroup.Item className="flaggedRow" as="li" key={i}>
                <Row>
                <Column>
                <div>
                <strong>Username:</strong> {item.author}
                </div>
                <div className="flaggedRow"><strong>Video:</strong>
                <Link to="/video_page" className="nav-link active" aria-current="page" state={{ 'currentUser': props.currentUser, 'video': props.videoData[i] }} onClick={() => props.setFlaggedModalShow(false)}><h6 id="link"> {item.title}</h6></Link></div>
                <div>
                <strong>Comment:</strong> {item.comment}</div>
                </Column>
                <Column>
                <Button id="clickButtonFlag" value={i} onClick={handleDelete}>Delete</Button>
                <Button id="clickButtonFlag" value={i} onClick={handleKeep}>Keep</Button>
                </Column>
                </Row>
              </ListGroup.Item>
            ))}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button id="clickButton" onClick={() => props.setFlaggedModalShow(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Theme>
  );
}

export default Flagged;
