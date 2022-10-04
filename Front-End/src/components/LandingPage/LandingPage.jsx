/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row, Container, Carousel, Button, Badge, ListGroup } from 'react-bootstrap';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');
//TODO:  Add an alt description for each img
function LandingPage({ currentUser, videoData, setVideoData }) {
  const [index, setIndex] = useState(0);
  const [thumbnails, setThumbnails] = useState('');
  const [sortOn, setSortOn] = useState('insightful');
  const [button, setButton] = useState(true);
  const [favorited, setFavorited] = useState('Favorite this Creator!');
  const [faved, setFaved] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInsightful, setInsightful] = useState(false);
  const [isFunny, setFunny] = useState(false);
  const [isInformative, setInformative] = useState(false);
  useEffect(() => {
    console.log(isFavorite);
  }, [isFavorite])
  // ============= is the user a favorite ==================
  useEffect(() => {
    if (videoData) {
      axios.get('http://localhost:8080/user')
        .then(res => {
          //console.log('get user res', res.data);
          res.data.forEach(profile => {
            if (profile.username === currentUser) {
              if (profile.favCreator.includes(videoData[index].username)) {
                setIsFavorite(true);
                setFavorited('This is one of your Favorite Creators');
              } else {
                setIsFavorite(false);
                setFavorited('Favorite this Creator!');
              }
            }
          })
        })
      //.then(() => console.log('isFavorite =', isFavorite))
    }
  }, [videoData]);
  // ===================== set button state ==========================
  useEffect(() => {
    if (videoData) {
      if (videoData[index].votes.informative.usernames.includes(currentUser)) {
        setInformative(true);
      } else {
        setInformative(false);
      }
      if (videoData[index].votes.insightful.usernames.includes(currentUser)) {
        setInsightful(true);
      } else {
        setInsightful(false);
      }
      if (videoData[index].votes.funny.usernames.includes(currentUser)) {
        setFunny(true);
      } else {
        setFunny(false);
      }
    }
  }, [index])
  useEffect(() => {
    console.log(isFunny, isInformative, isInsightful);
  }, [isFunny, isInformative, isInsightful])
  // ========== mount components via get video from db ================

  useEffect(() => {
    getThumbnails();
  }, [sortOn])

  const getThumbnails = () => {
    if (sortOn !== 'favorited') {
      axios.get(`http://localhost:8080/video/${sortOn}`)
        .then(res => {
          setVideoData(res.data);
          //console.log(res.data);
        })
        .catch(err => {
          console.log(err)
        });
    } else {
      axios.get(`http://localhost:8080/video/${sortOn}`)
        .then(res => {
          console.log(res.data[0].videos);
          let temp = res.data.map(data => data.videos[0]);
          setVideoData(temp);
        })
        .catch(err => {
          console.log(err)
        });
    }
  }
  // ============ create a map of the thumbnails ===================
  useEffect(() => {
    //console.log('this is the videoData', videoData);
    if (videoData) {
      if (videoData[index].votes.informative.usernames.includes(currentUser)) {
        setInformative(true);
      } else {
        setInformative(false);
      }
      if (videoData[index].votes.insightful.usernames.includes(currentUser)) {
        setInsightful(true);
      } else {
        setInsightful(false);
      }
      if (videoData[index].votes.funny.usernames.includes(currentUser)) {
        setFunny(true);
      } else {
        setFunny(false);
      }
      //console.log(videoData);
      //let temp = videoData.map(data => data.thumbnail);
      let temp = [];
      for (var i = 0; i < videoData.length; i++) {
        if (videoData[i]) {
          temp.push(videoData[i].url.replace('.mp4', '.jpg'));
        }
      }
      setThumbnails(temp);
    }
  }, [videoData]);
  // ============= navigation function ====================
  const navigateToVideoPage = () => {
    //   //navigate('/video_page');
    console.log('navigating to VideoPage...')
  };
  // ================ handle button updates to the database ==================
  const handleInsightful = () => {
    axios.put(`http://localhost:8080/video/insightful`, { currentUser: currentUser, username: videoData[index].username, videoID: videoData[index]._id })
      .then(() => {
        getThumbnails();
      })
      .catch(err => console.log(err));
  }
  const handleUnInsightful = () => {
    axios.put(`http://localhost:8080/video/insightfulx`, { currentUser: currentUser, username: videoData[index].username, videoID: videoData[index]._id })
      .then(() => {
        getThumbnails();
      })
      .catch(err => console.log(err));
  }
  const handleInformative = () => {
    axios.put(`http://localhost:8080/video/informative`, { currentUser: currentUser, username: videoData[index].username, videoID: videoData[index]._id })
      .then(() => {
        getThumbnails();
        if (videoData[index].votes.informative.usernames.includes(currentUser)) {
          setInformative(true);
        } else {
          setInformative(false);
        }
      })
      .catch(err => console.log(err));
  }
  const handleUnInformative = () => {
    axios.put(`http://localhost:8080/video/informativex`, { currentUser: currentUser, username: videoData[index].username, videoID: videoData[index]._id })
      .then(() => {
        getThumbnails();
      })
      .catch(err => console.log(err));
  }
  const handleFunny = () => {
    axios.put(`http://localhost:8080/video/funny`, { currentUser: currentUser, username: videoData[index].username, videoID: videoData[index]._id })
      .then(() => {
        getThumbnails();
      })
      .catch(err => console.log(err));
  }
  const handleUnFunny = () => {
    axios.put(`http://localhost:8080/video/funnyx`, { currentUser: currentUser, username: videoData[index].username, videoID: videoData[index]._id })
      .then(() => {
        getThumbnails();
      })
      .catch(err => console.log(err));
  }
  function handleFave() {
    return axios.put('http://localhost:8080/video/userprofile', { currentUser: currentUser, user: videoData[index].username })
      .then((data) => {
        setIsFavorite(true);
      });
  }
  function handleUnFave() {
    return axios.put('http://localhost:8080/video/userprofilex', { currentUser: currentUser, user: videoData[index].username })
      .then((data) => {
        setIsFavorite(false);
      });
  }
  const favorites = () => {
    if (isFavorite) {
      setFavorited('This is one of your Favorite Creators');
    } else {
      setFavorited('Favorite this Creator!');
    }
  }
  if (videoData.length) {
    return (
      <div>
        {
          (!thumbnails.length) ? <div></div> :
            <Container class="w-auto p-11">
              <Row >
                <Col class="border border-success">
                  <select onChange={(e) => {
                    const selectedMenuOption = e.target.value;
                    setSortOn(selectedMenuOption);
                  }}>
                    <option value='recent'>most recent</option>
                    <option value='informative'>Informative</option>
                    <option value='favorited'>most favorited creators</option>
                    <option value='insightful'>Insightful</option>
                    <option value='funny'>Funny</option>
                  </select>
                  <Row>
                    <Col>
                      <h1>{videoData[index].title}</h1>
                    </Col>
                  </Row>
                  <Row>
                    <div class="border board-primary">{timeAgo.format(new Date(videoData[index].dateUploaded).getTime(), 'round-minute')}</div>
                  </Row>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Link to="profile_page" state={{ currentUser: currentUser, user: videoData[index].username }}>
                      <h5 className="videoUser"><strong>{videoData[index].username}</strong></h5>
                    </Link>
                    <Badge className="border border-warning" pill bg="warning" text="dark" onClick={() => {
                      favorites();
                      (isFavorite) ? handleUnFave() : handleFave()
                    }
                    }
                    >{favorited}</Badge>
                  </div>
                  <h5 >{videoData[index].description}</h5>
                  <div >
                    <div>
                      <h5><strong>Mark This Video As:</strong></h5>
                    </div>
                    <Row>
                      <Col class="border border-primary"> <Button variant="primary" id="insightful" className="vote" onClick={() => (isInsightful) ? handleUnInsightful() : handleInsightful()}>Insightful<Badge bg="secondary" >{videoData[index].votes.insightful.usernames.length}{(isInsightful) ? ':thinking_face:' : ''}</Badge></Button></Col>
                      <Col> <Button variant="primary" id="funny" className="vote" onClick={() => { (isFunny) ? handleUnFunny() : handleFunny() }}>Funny<Badge bg="secondary" className="voteCount">{videoData[index].votes.funny.usernames.length}{(isFunny) ? ':joy:' : ''}</Badge></Button></Col>
                      <Col> <Button variant="primary" id="informative" className="vote" onClick={() => { (isInformative) ? handleUnInformative() : handleInformative() }}>Informative<Badge bg="secondary" className="voteCount">{videoData[index].votes.informative.usernames.length}{(isInformative) ? ':information_source:' : ''}</Badge></Button></Col>
                    </Row>
                  </div>
                </Col>
                <Col class="border border-success" md={8}>
                  <Carousel interval={null} onSlide={setIndex}>
                    {
                      thumbnails.map((thumbnail, i) => {
                        return (<Carousel.Item key={i}>
                          <Link to="video_page" state={{ 'currentUser': currentUser, 'video': videoData[index] }}>
                            <img className="d-block w-100" src={thumbnail} />
                          </Link>
                        </Carousel.Item>)
                      })
                    }
                  </Carousel>
                </Col>
              </Row>
            </Container>
        }
      </div>
    )
  }
  return null;
}
export default LandingPage;