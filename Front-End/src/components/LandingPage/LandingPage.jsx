/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row, Container, Carousel, Button, Badge, ListGroup } from 'react-bootstrap';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Form from 'react-bootstrap/Form';
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');
//TODO:  Add an alt description for each img
function LandingPage({ currentUser, videoData, setVideoData }) {
  const [index, setIndex] = useState(0);
  const [thumbnails, setThumbnails] = useState('');
  const [sortOn, setSortOn] = useState('insightful');
  const [button, setButton] = useState(true);
  const [favorited, setFavorited] = useState(['unfavorited', 'Favorite this Creator!']);
  const [isFavorite, setIsFavorite] = useState(false);
  // ============= is the user a favorite ==================
  useEffect(() => {
    if (videoData) {
      axios.get('http://ec2-52-14-88-68.us-east-2.compute.amazonaws.com:8080/user')
        .then(res => {
          //console.log('get user res', res.data);
          res.data.forEach(profile => {
            if (profile.username === currentUser.username) {
              if (profile.favCreator.includes(videoData[index].username)) {
                setFavorited(['favorited', 'This is one of your Favorite Creators']);
              } else {
                setFavorited(['unfavorited','Favorite this Creator!']);
              }
            }
          })
        })
    }
  }, [videoData]);
  // ===================== set button state ==========================
  // useEffect(() => {
  //   if (videoData) {
  //     if (videoData[index].votes.informative.usernames.includes(currentUser)) {
  //       setInformative(true);
  //     } else {
  //       setInformative(false);
  //     }
  //     if (videoData[index].votes.insightful.usernames.includes(currentUser)) {
  //       setInsightful(true);
  //     } else {
  //       setInsightful(false);
  //     }
  //     if (videoData[index].votes.funny.usernames.includes(currentUser)) {
  //       setFunny(true);
  //     } else {
  //       setFunny(false);
  //     }
  //   }
  // }, [index])

  useEffect(() => {
    getThumbnails();
  }, [sortOn])

  const getThumbnails = () => {
    // console.log('sortOn =', sortOn);
    if (sortOn !== 'favorited') {
      axios.get(`http://ec2-52-14-88-68.us-east-2.compute.amazonaws.com:8080/video/${sortOn}`)
        .then(res => {
          setVideoData(res.data);
          // console.log(res.data);
        })
        .catch(err => {
          console.log(err)
        });
    } else {
      axios.get(`http://ec2-52-14-88-68.us-east-2.compute.amazonaws.com:8080/video/${sortOn}`)
        .then(res => {
          let temp = [];
          for(var i = 0; i < res.data.length; i++){
            if(res.data[i].videos[0]){
              temp.push(res.data[i].videos[0]);
            }
          }
          //console.log('there are the favorited videos =',temp);
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
  // const navigateToVideoPage = () => {
  //   //   //navigate('/video_page');
  //   console.log('navigating to VideoPage...')
  // };
  // ================ handle button updates to the database ==================
  const handleInsightful = () => {
    axios.put(`http://ec2-52-14-88-68.us-east-2.compute.amazonaws.com:8080/video/insightful`, { currentUser: currentUser, username: videoData[index].username, videoID: videoData[index]._id })
      .then(() => {
        getThumbnails();
      })
      .catch(err => console.log(err));
  }
  const handleUnInsightful = () => {
    axios.put(`http://ec2-52-14-88-68.us-east-2.compute.amazonaws.com:8080/video/insightfulx`, { currentUser: currentUser, username: videoData[index].username, videoID: videoData[index]._id })
      .then(() => {
        getThumbnails();
      })
      .catch(err => console.log(err));
  }
  const handleInformative = () => {
    axios.put(`http://ec2-52-14-88-68.us-east-2.compute.amazonaws.com:8080/video/informative`, { currentUser: currentUser, username: videoData[index].username, videoID: videoData[index]._id })
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
    axios.put(`http://ec2-52-14-88-68.us-east-2.compute.amazonaws.com:8080/video/informativex`, { currentUser: currentUser, username: videoData[index].username, videoID: videoData[index]._id })
      .then(() => {
        getThumbnails();
      })
      .catch(err => console.log(err));
  }
  const handleFunny = () => {
    axios.put(`http://ec2-52-14-88-68.us-east-2.compute.amazonaws.com:8080/video/funny`, { currentUser: currentUser, username: videoData[index].username, videoID: videoData[index]._id })
      .then(() => {
        getThumbnails();
      })
      .catch(err => console.log(err));
  }
  const handleUnFunny = () => {
    axios.put(`http://ec2-52-14-88-68.us-east-2.compute.amazonaws.com:8080/video/funnyx`, { currentUser: currentUser, username: videoData[index].username, videoID: videoData[index]._id })
      .then(() => {
        getThumbnails();
      })
      .catch(err => console.log(err));
  }
  function handleFave() {
    return axios.put('http://ec2-52-14-88-68.us-east-2.compute.amazonaws.com:8080/userprofile', { currentUser: currentUser, user: videoData[index].username })
      .then((data) => {
        setFavorited(['favorited', 'This is one of your Favorite Creators']);
      });
  }
  function handleUnFave() {
    return axios.put('http://ec2-52-14-88-68.us-east-2.compute.amazonaws.com:8080/userprofilex', { currentUser: currentUser, user: videoData[index].username })
      .then((data) => {
        setFavorited(['unfavorited','Favorite this Creator!']);
      });
  }
  // const favorites = () => {
  //   if (isFavorite) {
  //     setFavorited('This is one of your Favorite Creators');
  //   } else {
  //     setFavorited('Favorite this Creator!');
  //   }
  // }
  if (videoData.length) {
    return (
      <div>
        {
          (!thumbnails.length) ? <div></div> :
            <Container className="w-auto p-11">
              <Row >
                <Col className="border-success">
                  <Form.Select size="lg" onChange={(e) => {
                    const selectedMenuOption = e.target.value;
                    setSortOn(selectedMenuOption);
                  }}>
                    <option value='recent'>most recent</option>
                    <option value='informative'>Informative</option>
                    <option value='favorited'>most favorited creators</option>
                    <option value='insightful'>Insightful</option>
                    <option value='funny'>Funny</option>
                  </Form.Select>
                  <Row>
                    <Col id="data">
                      <h1 id="VideoTitle">{videoData[index].title}</h1>
                    </Col>
                  </Row>
                  <Row>
                    <div id="time" className="board-primary">{timeAgo.format(new Date(videoData[index].dateUploaded).getTime(), 'round-minute')}</div>
                  </Row>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Link to="profile_page" state={{ currentUser: currentUser, user: videoData[index].username }}>
                      <h5 className="videoUser"><strong>{videoData[index].username}</strong></h5>
                    </Link>
                    <Badge id={favorited[0]} className="border border-warning" pill bg="warning" text="dark" onClick={() => {
                      (favorited[0] === 'favorited') ? handleUnFave() : handleFave()
                    }
                    }
                    >{favorited[1]}</Badge>
                  </div>
                  <div id="des">
                    <h5 id="description">{videoData[index].description}</h5>
                  </div>
                </Col>
                <Col id="carousel" class="border border-success" md={8}>
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
              <Row>
                  <div >
                    <div>
                      <Button variant="primary" id="insightful" className="vote nonclick">Insightful
                        <br>
                        </br>
                        <Badge bg="secondary">{videoData[index].votes.insightful.usernames.length}</Badge>
                      </Button>
                      <Button variant="primary" id="funny" className="vote">Funny<br>
                      </br><Badge bg="secondary" className="voteCount">{videoData[index].votes.funny.usernames.length}</Badge>
                      </Button>
                      <Button variant="primary" id="informative" className="vote" >Informative
                        <br>
                        </br>
                        <Badge bg="secondary" className="voteCount">{videoData[index].votes.informative.usernames.length}</Badge>
                      </Button>
                    </div>
                  </div>
              </Row>

            </Container>
        }
      </div>
    )
  }
  return null;
}
export default LandingPage;