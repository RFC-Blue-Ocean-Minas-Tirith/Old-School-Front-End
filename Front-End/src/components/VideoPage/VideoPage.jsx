import { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row, Container, Button, Badge, ListGroup } from 'react-bootstrap';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo } from '@cloudinary/react';
import { pad } from '@cloudinary/url-gen/actions/resize';
// import AddComment from '../Modals/AddComment.jsx';

function VideoPage({ video, user }) {
  // -----State-----
  const [currentVid, setCurrentVid] = useState({
    objectID: 1,
    title: 'Fake Vid',
    description: 'This video is so silly and ridiculous you have no idea omg you should totally watch it it has cats.',
    username: 'Grumpycat',
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
    }
    ],
    URL: 'http://www.google.com',
    votes: {
      insightful: {
        usernames: ['john', 'jacob', 'jimmerheimer'],
        count: 3,
      },
      funny: {
        usernames: ['john', 'jacob'],
        count: 2,
      },
      informative: {
        usernames: ['john'],
        count: 1,
      },
    },
    private: false,
  });
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'demo',
    },
  });
  const [favorited, setFavorited] = useState(['unfavorited', 'Favorite this Creator!']);
  const [userID, setUserID] = useState('');
  const [showModal, setShowModal] = useState('none');

  // -----Video Formatting-----
  const myVideo = cld.video('docs/walking_talking');
  myVideo.resize(pad().width(800));

  // -----UseEffect-----
  // useEffect(() => {
  //   /* don't use this one */axios.get('/video', { video })
  //     .then((response) => {
  //       setCurrentVid(response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  /* end of don't use */
  // setCurrentVid(video);
  // }, [video]);

  useEffect(() => {
    setUserID(user);
  }, [user]);

  // -----Event Handlers-----
  const updateVote = (e) => {
    // TODO: add in Authentication by updating both local and DB username array on the vote value
    // FIXME: why does this reload the video?
    e.preventDefault();
    const button = e.target.id;
    const vid = { ...currentVid };
    vid.votes[button].count += 1;
    setCurrentVid(vid);
    axios.put('/video/vote', { vote: button })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  const favorite = (e) => {
    e.preventDefault();
    let user = e.target.previousElementSibling.id;
    if (favorited[0] === 'unfavorited') {
      setFavorited(['favorited', 'This is one of your Favorite Creators']);
      // TODO: put request to send to new favorited creator to current user's data
    } else {
      setFavorited(['unfavorited', 'Favorite this Creator!']);
      //TODO: put request to removed favorited from current user's data
    }
  };

  const toggleModal = (e) => {
    e.preventDefault();
    const display = showModal === 'none' ? 'block' : 'none';
    setShowModal(display);
  };

  return (
    <Container style={{ height: '100%' }}>
      {/* <AddComment style={{ display: { showModal } }}
        toggleModal={toggleModal}
        userID={userID}
        videoID={currentVid.objectID}
      /> */}
      <Row style={{ marginTop: '30px' }}>
        <Col xs={7}>
          <div>
            <AdvancedVideo style={{ maxWidth: '100%' }} cldVid={myVideo} controls preload="true" />
          </div>
          <h2>{currentVid.title}</h2>
          <p>{currentVid.date}</p>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <h5 id={currentVid.username} className="videoUser"><strong>{currentVid.username}</strong></h5>
            <Badge id={favorited[0]} className="border border-warning" pill bg="warning" text="dark" onClick={favorite}>{favorited[1]}</Badge>
          </div>
          <p>{currentVid.description}</p>
          <div>
            <Button variant="primary" id="insightful" className="vote" onClick={updateVote}>
              Insightful
              <Badge bg="secondary" className="voteCount">{currentVid.votes.insightful.count}</Badge>
            </Button>
            <Button variant="primary" id="informative" className="vote" onClick={updateVote}>
              Informative
              <Badge bg="secondary" className="voteCount">{currentVid.votes.informative.count}</Badge>
            </Button>
            <Button variant="primary" id="funny" className="vote" onClick={updateVote}>
              Funny
              <Badge bg="secondary" className="voteCount">{currentVid.votes.funny.count}</Badge>
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
            {currentVid.comments.map((comment) => (
              <ListGroup.Item as="li" key={comment.id}>
                <div className="commentRow">
                  <h5>{comment.author}</h5>
                  <h6 className="date">{comment.date}</h6>
                </div>
                <p>{comment.comment}</p>
                <h6 className="report">Report Comment</h6>
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
