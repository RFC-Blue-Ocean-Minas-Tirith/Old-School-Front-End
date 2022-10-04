import { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row, Container, Button, Badge, ListGroup } from 'react-bootstrap';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo } from '@cloudinary/react';
import { pad } from '@cloudinary/url-gen/actions/resize';
import { Link, useLocation } from 'react-router-dom';
import { signInWithGoogle } from './../Navbar/firebase.js';
import { cloudName } from '../Modals/config';

import AddComment from '../Modals/AddComment.jsx';

function VideoPage() {
  const location = useLocation();
  const { video, currentUser } = location.state;
  // -----State-----
  const [currentVid, setCurrentVid] = useState({
    _id: `ObjectId("633b508828a2b0d986c22f92")`,
    title: 'Jay Talking',
    description: 'Jay Pritchett\'s complaints about goat cheese',
    username: 'Jay',
    date_Uploaded: '10/1/2022',
    comments: [{
      id: 1,
      author: 'Alice',
      comment: 'Is that Jake from State Farm?!',
      date: '10/1/2022',
    },
    {
      id: 2,
      author: 'Adam',
      comment: 'Jealous of those beards...',
      date: '10/1/2022',
    },
    {
      id: 3,
      author: 'Vicki',
      comment: 'Look at these bros....',
      date: '10/1/2022',
    },
    {
      id: 4,
      author: 'Melissa',
      comment: 'Is that Colonel Mustard?',
      date: '10/1/2022',
    },
    {
      id: 5,
      author: 'Zach',
      comment: 'Where are they walking though...',
      date: '10/1/2022',
    },
    ],
    URL: 'http://res.cloudinary.com/dulhjtu0p/raw/upload/v1664831615/whdt2ntpbmygnj14zqih',
    votes: {
      insightful: {
        usernames: ['john', 'jacob', 'jimmerheimer'],
      },
      funny: {
        usernames: ['john', 'jacob'],
      },
      informative: {
        usernames: ['john'],
      },
    },
    private: false,
  });
  const [favorited, setFavorited] = useState(['unfavorited', 'Favorite this Creator!']);
  const currUser = currentUser;
  const [showModal, setShowModal] = useState(false);
  const cld = new Cloudinary({
    cloud: {
      cloudName: cloudName,
    },
  });

  // -----Video Formatting-----
  const myVideo = cld.video('x4qdcx7l6hyhqes24owk');
  myVideo.resize(pad().width(800));

  // -----UseEffect-----
  useEffect(() => {
    setCurrentVid(video);
  }, [video]);

  // useEffect(() => {
  //   setCurrUser(user);
  // }, [user]);
  // -----Event Handlers-----
  const updateVote = (e) => {
    // TODO: add in Authentication by updating both local and DB username array on the vote value
    // FIXME: why does this reload the video?
    if (!currUser) {
      signInWithGoogle();
      return;
    }
    e.preventDefault();
    const button = e.target.id;
    if (currentVid.votes[button].usernames.indexOf(currUser.username) === -1) {
      const vid = { ...currentVid };
      vid.votes[button].count += 1;
      vid.votes[button].usernames.push(currUser.username);
      setCurrentVid(vid);
      axios.put('http://localhost:8080/video/vote', { videoID: currentVid._id, vote: button, username: currUser.username })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  };

  const favorite = (e) => {
    if (!currUser) {
      signInWithGoogle();
      return;
    }
    e.preventDefault();
    if (favorited[0] === 'unfavorited') {
      setFavorited(['favorited', 'This is one of your Favorite Creators']);
      axios.put('http://localhost:8080/userprofile', { currentUser: currUser.username, user: currentVid.username })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFavorited(['unfavorited', 'Favorite this Creator!']);
      axios.put('http://localhost:8080/userprofilex', { currentUser: currUser.username, user: currentVid.username })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const report = (e) => {
    if (!currUser) {
      signInWithGoogle();
      return;
    }
    e.preventDefault();
    const id = e.target.attributes[1].nodeValue;
    const type = e.target.attributes[2].nodeValue;
    axios.put('http://localhost:8080/video/report', { id, type })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleModal = () => {
    const display = !showModal;
    setShowModal(display);
  };

  return (
    <Container style={{ height: '100%' }}>
      <AddComment
        show={showModal}
        toggleModal={toggleModal}
        user={currUser}
        videoID={currentVid.objectID}
      />
      <Row style={{ marginTop: '30px' }}>
        <Col xs={7}>
          <div>
            <AdvancedVideo style={{ maxWidth: '100%' }} cldVid={myVideo} controls preload="true" />
          </div>
          <h2>{currentVid.title}</h2>
          <p>{currentVid.date}</p>
          <div className="videoCreator" >
            <Link to="/profile_page" state={{ user: currentVid.username, currentUser: currUser }}>
              <h5 id={currentVid.username} className="videoUser"><strong>{currentVid.username}</strong></h5>
            </Link>
            <Badge id={favorited[0]} className="border border-warning" pill bg="warning" text="dark" onClick={favorite}>{favorited[1]}</Badge>
          </div>
          <div className='videoDescription'>
            <p>{currentVid.description}</p>
            <h6 className="report" vidid={currentVid._id} type='video' onClick={report}>Report Comment</h6>
          </div>
          <div>
            <Button variant="primary" id="insightful" className="vote" onClick={updateVote}>
              Insightful
              <br></br>
              <Badge bg="secondary" className="voteCount">{currentVid.votes.insightful.usernames.length}</Badge>
            </Button>
            <Button variant="primary" id="informative" className="vote" onClick={updateVote}>
              Informative
              <br></br>
              <Badge bg="secondary" className="voteCount">{currentVid.votes.informative.usernames.length}</Badge>
            </Button>
            <Button variant="primary" id="funny" className="vote" onClick={updateVote}>
              Funny
              <br></br>
              <Badge bg="secondary" className="voteCount">{currentVid.votes.funny.usernames.length}</Badge>
            </Button>
          </div>
        </Col>
        <Col>
          <ListGroup
            variant="flush"
            style={{
              overflowX: 'overflow',
              overflowY: 'scroll',
              maxHeight: '90%',
            }}
          >
            {currentVid.comments.map((comment, index) => (
              <ListGroup.Item as="li" key={comment.id}>
                <div className="commentRow">
                  <h5>{comment.author}</h5>
                  <h6 className="date">{comment.date}</h6>
                </div>
                <p>{comment.comment}</p>
                <h6 className="report" index={index} type='comment' onClick={report}>Report Comment</h6>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button style={{ width: '100%', height: '10%' }} bg="primary" onClick={toggleModal}>Add Comment</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default VideoPage;
