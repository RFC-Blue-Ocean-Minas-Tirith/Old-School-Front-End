/* eslint-disable react/prop-types */
/* eslint-disable */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BlogCarousel from './BlogCarousel';
import VideoCarousel from './VideoCarousel';
import AboutMe from './AboutMe';

function ProfilePage() {
  const [videos, setVideos] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [userObj, setUser] = useState({});
  const location = useLocation();

  const { user, currentUser } = location.state;

  function fetchData() {
    return axios.get(`http://localhost:8080/user/${user}`)
    .then((data) => {
      setUser(data.data);
    })
    .then(() => {
      return axios.get(`http://localhost:8080/video/user/${user}`)
    })
    .then((data) => {
      setVideos(data.data);
    })
    .then(() => {
      return axios.get(`http://localhost:8080/blog/user/${user}`);
    })
    .then((data) => {
      setBlogs(data.data);
    });
  }

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <AboutMe user={userObj} currentUser={{'username': 'AllEyesBlank', favCreator: ['soup', 'soupy']}} />
        </div>
        <div className="col-md-8">
          <VideoCarousel videos={videos} currentUser={currentUser} />
          <BlogCarousel blogs={blogs} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
