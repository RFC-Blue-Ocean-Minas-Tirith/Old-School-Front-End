/* eslint-disable */
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Col, Row, Container, Button, Badge, ListGroup, Alert, Overlay, Tooltip } from 'react-bootstrap';
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
  // -----State-----
  const [currentVid, setCurrentVid] = useState();
  const [favorited, setFavorited] = useState(['unfavorited', 'Favorite this Creator!']);
  const [currUser, setCurrUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [firstPic, setFirstPic] = useState('');
  const [myVideo, setMyVideo] = useState();
  const [showInsightful, setShowInsightful] = useState(false);
  const [showInformative, setShowInformative] = useState(false);
  const [showFunny, setShowFunny] = useState(false);
  const target1 = useRef(null);
  const target2 = useRef(null);
  const target3 = useRef(null);
  const cld = new Cloudinary({
    cloud: {
      cloudName: cloudName,
    },
  });
  // -----UseEffect-----
  useEffect(() => {
    setCurrentVid(video);
  }, [video]);
  useEffect(() => {
    if (currentUser && currentVid) {
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
  }, [currentUser, currentVid]);

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
    } else {
      switch (button) {
        case 'insightful':
          setShowInsightful(!showInsightful);
          break;
        case 'informative':
          setShowInformative(!showInformative);
          break;
        case 'funny':
          setShowFunny(!showFunny);
          break;
      }
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
    const index = e.target.attributes[4].nodeValue;
    axios.put('http://localhost:8080/video/report', { id, type, commentID })
      .catch((err) => {
        console.log(err);
      });
    let vid = { ...currentVid };
    if (type === 'video') {
      vid.reported = true;
    } else {
      vid.comments[index].isReported = true;
    }
    setCurrentVid(vid)
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

  if (!currentVid) {
    return <></>
  }

  const reportField = !currentVid.reported ? (<h6 className="report" vidid={currentVid._id} type='video' filler={0} filler2={0} onClick={report}>{'<Report Video>'}</h6>) : (<Alert variant='warning'>Reported for admin review</Alert>);
  return (
    <Container fluid>
      <Row >
        <Col xs={7} className="text-center">
          <div className="videoTitle">
            <h2>{currentVid.title}</h2>
            <h6>{timeAgo.format(new Date(currentVid.dateUploaded))}</h6>
          </div>
          <div>
            <AdvancedVideo style={{ maxWidth: '100%', maxHeight: "500px" }} cldVid={myVideo} controls preload="true" poster={firstPic} />
          </div>
          <div className="videoCreator">
            <Link to="/profile_page" state={{ user: currentVid.username, currentUser: currUser }}>
              <h5 id={currentVid.username} className="videoUser"><strong>{currentVid.username}</strong></h5>
            </Link>
            <Badge id={favorited[0]} style={{ fontSize: '16px' }} className="border border-warning" pill bg="warning" text="dark" onClick={favorite}>{favorited[1]}</Badge>
          </div>
          <div className='videoDescription'>
            <p>{currentVid.description}</p>
            {reportField}
          </div>
          <div>
            <Button variant="warning" id="insightful" className="vote" ref={target1} onClick={updateVote}>
              Insightful
              <br></br>
              <Badge bg="secondary" className="voteCount" >{currentVid.votes.insightful.usernames.length}</Badge>
            </Button>
            <Overlay target={target1.current} show={showInsightful} placement='bottom'>
              {(props) => (
                <Tooltip id='insightfulTT' {...props}>
                  Already Voted, Thank You!
                </Tooltip>
              )}
            </Overlay>
            <Button variant="warning" id="informative" className="vote" ref={target2} onClick={updateVote}>
              Informative
              <br></br>
              <Badge bg="secondary" className="voteCount">{currentVid.votes.informative.usernames.length}</Badge>
            </Button>
            <Overlay target={target2.current} show={showInformative} placement='bottom'>
              {(props) => (
                <Tooltip id='informativeTT' {...props}>
                  Already Voted, Thank You!
                </Tooltip>
              )}
            </Overlay>
            <Button variant="warning" id="funny" className="vote" ref={target3} onClick={updateVote}>
              Funny
              <br></br>
              <Badge bg="secondary" className="voteCount">{currentVid.votes.funny.usernames.length}</Badge>
            </Button>
            <Overlay target={target3.current} show={showFunny} placement='bottom'>
              {(props) => (
                <Tooltip id='funnyTT' {...props}>
                  Already Voted, Thank You!
                </Tooltip>
              )}
            </Overlay>
          </div>
        </Col>
        <Col>
          <div className="videoTitle">
            <h2>Comments</h2>
          </div>
          <ListGroup
            variant="flush"
            style={{
              overflowX: 'overflow',
              overflowY: 'scroll',
              maxHeight: '79%',
            }}
          >
            {currentVid.comments.map((comment, index) => {
              let reportCommField = comment.isReported ? (<Alert variant='warning'>Reported for admin review</Alert>) : (<h4 className="report" vidid={currentVid._id} type='comment' commentid={comment._id} index={index} onClick={report}>{'<Report Comment>'}</h4>)

              return (<ListGroup.Item as="li" key={comment._id}>
                <div className="commentRow">
                  <h5 className='commentUser'><strong>{comment.author}</strong></h5>
                  <h4 className="date">{timeAgo.format(new Date(comment.date))}</h4>
                </div>
                <p className='commentText'>{comment.comment}</p>
                {reportCommField}
              </ListGroup.Item>)
            })}
          </ListGroup>
          <div id="commentSpacer"></div>
          <Button id="clickButton" style={{ width: '100%', height: '8%' }} bg="primary" variant="warning" onClick={toggleModal}>Add Comment</Button>
        </Col>
      </Row>
      <AddComment
        show={showModal}
        toggleModal={toggleModal}
        currUser={currUser.username}
        videoID={currentVid._id}
        addComment={addComment}
      />
    </Container >
  );
}

export default VideoPage;
