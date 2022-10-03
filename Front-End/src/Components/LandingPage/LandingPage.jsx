import React, { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

//TODO:  Add an alt description for each img

const LandingPage = () => {

  const [index, setIndex] = useState(0);
  const [videoData, setVideoData] = useState('');
  const [thumbnails, setThumbnails] = useState('');
  const [sortOn, setSortOn] = useState('insightful');
  const [button, setButton] = useState(true);

  useEffect(() => {
    //console.log('getting video from the client...')
    axios.get('http://localhost:8080/video')
      .then(res => {
        setVideoData(res.data);
      })
      .catch(err => {
        console.log(err)
      });
  }, [])

  useEffect(() => {
    console.log(sortOn);
    if(sortOn !== 'favorited'){
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
  },[sortOn])

  useEffect(() => {
    //console.log('this is the videoData', videoData);
    if (videoData) {
      //console.log(videoData);
      //let temp = videoData.map(data => data.thumbnail);
      let temp = [];
      for(var i = 0; i < videoData.length; i++) {
        if(videoData[i]) {
          temp.push(videoData[i].thumbnail);
        }
      }
      setThumbnails(temp);
    }
  }, [videoData]);
  // const navigate = useNavigate();
  const navigateToVideoPage = () => {
  //   //navigate('/video_page');
    console.log('navigating to VideoPage...')
  };

  // useEffect(() => {
  //   if()
  // },[button])


  const handleFavorite = () => {
    setButton(false)
    axios.put(`http://localhost:8080/video/${sortOn}`,
      params = {
        username: 'Michael_Scott',
        creator: videoData[index].username
      }
    )
    .then(res => console.log(res))
    .catch(err => console.log(err));
    }




  return (
    <div>
      {
        (!thumbnails.length) ? <div></div> :
    <Container class="w-auto p-11">
      <Row >
        <Col class="border border-success">
        <select  onChange={(e) => {
          const selectedMenuOption = e.target.value;
          setSortOn(selectedMenuOption);}}>
             <option value = 'recent'>most recent</option>
              <option value = 'informative'>Informative</option>
              <option value = 'favorited'>most favorited creators</option>
              <option value = 'insightful'>Insightful</option>
              <option value = 'funny'>Funny</option>
          </select>
          <Row>
            <Col>
              <h1>{videoData[index].title}</h1>
            </Col>

          </Row>
          <Row>
            <Col><div class="border board-primary">{timeAgo.format(new Date(videoData[index].dateUploaded).getTime(), 'round-minute')}</div> </Col>
            <Col>
            {(button)?<Button onClick = {handleFavorite}variant="primary">Favorite</Button>:<div></div>}
            </Col>
          </Row>
          <h5 class="border border-warning">{videoData[index].username}</h5>
          <h5 class="border border-dark">{videoData[index].description}</h5>
          <div >
            <Row>
              <Col class="border border-primary"> <Button variant="primary">Insightful</Button></Col>
              <Col> <Button variant="primary">Funny</Button></Col>
              <Col> <Button variant="primary">Informative</Button></Col>
            </Row>
          </div>
        </Col>

        <Col class="border border-success" md={8}>
          <Carousel interval={null} onSlide={setIndex}>
            {
              thumbnails.map((thumbnail, i) => {
                return (<Carousel.Item key={i}>
                  <img onClick = {navigateToVideoPage} className="d-block w-100" src={thumbnail} />
                </Carousel.Item>)
              })
            }
          </Carousel>
        </Col>
      </Row>

    </Container>
      }
    <div>
      {/* <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="profile_page" element={<ProfilePage />} />
      <Route path="video_page" element={<VideoPage />} />
    </Routes> */}
    </div>
    </div>
  )
}

export default LandingPage;