/* eslint-disable */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row, Container, Button, Badge, ListGroup } from 'react-bootstrap';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo } from '@cloudinary/react';
import { pad } from '@cloudinary/url-gen/actions/resize';
import { Link, useLocation } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { signInWithGoogle } from './../Navbar/firebase';
import { cloudName } from '../Modals/config';
import AddComment from '../Modals/AddComment';
const timeAgo = new TimeAgo('en-US');

function VideoPage() {
  const location = useLocation();
  const { video, currentUser } = location.state;
  // const currentUser = {
  //   username: 'Kevin Moyer',
  //   uid: '',
  //   email: 'kevin7.moyer@gmail.com',
  //   favCreator: [],
  //   isAdmin: false,
  //   profilePicture: 'https://lh3.googleusercontent.com/a-/ACNPEu8qlJebzGRXncV4yX8XwLCtyJfZn1rpv32P4nw5=s96-c',
  // };
  // const video = {};

  // -----State-----
  const [currentVid, setCurrentVid] = useState(
    //   {
    //   _id: `633c9f3c8b04c676c67a146f`,
    //   title: 'Lookin Around',
    //   description: 'Jay Pritchett\'s complaints about goat cheese',
    //   username: 'Kevin Moyer',
    //   dateUploaded: '2022-10-03T21:13:44.576Z',
    //   comments: [{
    //     _id: 1,
    //     author: 'Alice',
    //     comment: 'Is that Jake from State Farm?!',
    //     date: '2022-10-03T21:13:44.576Z',
    //   },
    //   {
    //     _id: 2,
    //     author: 'Adam',
    //     comment: 'Jealous of those beards...',
    //     date: '2022-10-04T19:29:31.146Z',
    //   },
    //   {
    //     _id: 3,
    //     author: 'Vicki',
    //     comment: 'Look at these bros....',
    //     date: '2022-10-04T19:29:31.146Z',
    //   },
    //   {
    //     _id: 4,
    //     author: 'Melissa',
    //     comment: 'Is that Colonel Mustard?',
    //     date: '2022-10-04T19:29:31.146Z',
    //   },
    //   {
    //     _id: '633cebd065d3d46f86af90cb',
    //     author: 'Zach',
    //     comment: 'Where are they walking though...',
    //     date: '2022-10-04T19:29:31.146Z',
    //   },
    //   ],
    //   URL: 'http://res.cloudinary.com/dulhjtu0p/video/upload/v1664917298/dxedveswjewbth38qulg.mp4',
    //   thumbnail: 'https://res.cloudinary.com/dulhjtu0p/video/upload/c_limit,h_60,w_90/v1664917298/dxedveswjewbth38qulg.jpg',
    //   votes: {
    //     insightful: {
    //       usernames: ['john', 'jacob', 'jimmerheimer'],
    //     },
    //     funny: {
    //       usernames: ['john', 'jacob'],
    //     },
    //     informative: {
    //       usernames: ['john'],
    //     },
    //   },
    //   private: false,
    // }
  );
  const [favorited, setFavorited] = useState(['unfavorited', 'Favorite this Creator!']);
  const [currUser, setCurrUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [firstPic, setFirstPic] = useState('');
  const [myVideo, setMyVideo] = useState();
  const cld = new Cloudinary({
    cloud: {
      cloudName: cloudName,
    },
  });

  // -----Video Formatting-----


  // -----UseEffect-----
  useEffect(() => {
    setCurrentVid(video);
  }, [video]);

  useEffect(() => {
    if (currentUser) {
      setCurrUser(currentUser);
      axios.get(`http://localhost:8080/user/favs`, {
        params: {
          user: currentUser.username
        }
      })
        .then(({ data }) => {
          const favorite = data.indexOf(currentVid.username) === -1 ? ['unfavorited', 'Favorite this Creator!'] : ['favorited', 'This is one of your Favorite Creators'];
          setFavorited(favorite);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (currentVid) {
      setFirstPic(currentVid.url.replace('.mp4', '.jpeg'));
      let publicID = currentVid.url.split('/');
      publicID = publicID[publicID.length - 1];
      publicID = publicID.substring(0, publicID.length - 4);
      let vid = cld.video(publicID, {
        controls: true,
      })
      vid.resize(pad().width(800));
      setMyVideo(vid);
    }
  }, [currentVid])

  // -----Event Handlers-----
  const updateVote = (e) => {
    // TODO: add in Authentication by updating both local and DB username array on the vote value
    // FIXME: why does this reload the video?
    if (Object.keys(currUser).length === 0) {
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
    if (Object.keys(currUser).length === 0) {
      signInWithGoogle();
      return;
    }
    e.preventDefault();
    if (favorited[0] === 'unfavorited') {
      setFavorited(['favorited', 'This is one of your Favorite Creators']);
      axios.put('http://localhost:8080/userprofile', { currentUser: currUser, user: currentVid.username })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFavorited(['unfavorited', 'Favorite this Creator!']);
      axios.put('http://localhost:8080/userprofilex', { currentUser: currUser, user: currentVid.username })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const report = (e) => {
    if (Object.keys(currUser).length === 0) {
      signInWithGoogle();
      return;
    }
    e.preventDefault();
    const id = e.target.attributes[1].nodeValue;
    const type = e.target.attributes[2].nodeValue;
    const commentID = e.target.attributes[3].nodeValue;
    axios.put('http://localhost:8080/video/report', { id, type, commentID })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleModal = () => {
    const display = !showModal;
    setShowModal(display);
  };

  const addComment = (params) => {
    const vid = { ...currentVid };
    const comments = [...currentVid.comments];
    comments.push({
      id: -1,
      author: params.username,
      comment: params.comment,
      date: (params.date),
    });
    vid.comments = comments;
    setCurrentVid(vid);
  };

return (
  <Container style={{ height: '100%' }}>
    <Row style={{ marginTop: '30px' }}>
      <Col xs={8}>
        <div>
          <AdvancedVideo style={{ maxWidth: '100%' }} cldVid={myVideo} controls preload="true" poster={firstPic} />
        </div>
        <div className="videoCreator">
          <h2>{currentVid.title}</h2>
          <h6>{timeAgo.format(new Date(currentVid.dateUploaded))}</h6>
        </div>
        <div className="videoCreator">
          <Link to="/profile_page" state={{ user: currentVid.username, currentUser: currUser }}>
            <h5 id={currentVid.username} className="videoUser"><strong>{currentVid.username}</strong></h5>
          </Link>
          <Badge id={favorited[0]} className="border border-warning" pill bg="warning" text="dark" onClick={favorite}>{favorited[1]}</Badge>
        </div>
        <div className='videoDescription'>
          <p>{currentVid.description}</p>
          <h6 className="report" vidid={currentVid._id} type='video' filler={0} onClick={report}>Report Video</h6>
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
            <ListGroup.Item as="li" key={comment._id}>
              <div className="commentRow">
                <h5>{comment.author}</h5>
                <h6 className="date">{timeAgo.format(new Date(comment.date))}</h6>
              </div>
              <p>{comment.comment}</p>
              <h6 className="report" vidid={currentVid._id} type='comment' commentid={comment._id} onClick={report}>Report Comment</h6>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Button id="redButton" style={{ width: '100%', height: '10%' }} bg="primary" onClick={toggleModal}>Add Comment</Button>
      </Col>
    </Row>
    <AddComment
      show={showModal}
      toggleModal={toggleModal}
      currUser={currUser.username}
      videoID={currentVid._id}
      addComment={addComment}
    />
  </Container>
);
}

export default VideoPage;
