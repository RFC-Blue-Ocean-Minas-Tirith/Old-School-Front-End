/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCarousel from './BlogCarousel';
import VideoCarousel from './VideoCarousel';
import AboutMe from './AboutMe';

function ProfilePage({ user }) {
  // ProfilePage.PropTypes = { user: PropTypes.obj.isRequired }
  const [videos, setVideos] = useState([{
    title: 'Example 1',
    description: 'Love this video!',
    username: user,
    date: 'TIMESTAMP',
    keywords: [],
    comments: {},
    thumbnail: 'https://res.cloudinary.com/dwl50vubn/image/upload/v1664643111/Screen_Shot_2022-10-01_at_11.50.47_AM_ztuwta.png',
    url: 'https://youtu.be/fstH84wRwpo',
    votes: {},
    private: false,
  }, {
    title: 'Example 2',
    description: 'Love THAT video!',
    username: user,
    date: 'TIMESTAMP',
    keywords: [],
    comments: {},
    thumbnail: 'https://res.cloudinary.com/dwl50vubn/image/upload/v1664643214/Screen_Shot_2022-10-01_at_11.53.08_AM_i62erk.png',
    url: 'https://youtu.be/LLGdFAQ0RmU',
    votes: {},
    private: false,
  }, {
    title: 'Example 3',
    description: 'This ones okay!',
    username: user,
    date: 'TIMESTAMP',
    keywords: [],
    comments: {},
    thumbnail: 'https://res.cloudinary.com/dwl50vubn/image/upload/v1664643379/Screen_Shot_2022-10-01_at_11.55.49_AM_pezhch.png',
    url: 'https://youtu.be/4tuDwbDMidM',
    votes: {},
    private: false,
  },
  {
    title: 'Another video',
    description: 'Wild',
    username: user,
    date: 'TIMESTAMP',
    keywords: [],
    comments: {},
    thumbnail: 'https://res.cloudinary.com/dwl50vubn/image/upload/v1664643470/Screen_Shot_2022-10-01_at_11.57.25_AM_kuwii9.png',
    url: 'https://youtu.be/zZaurMNo5l0',
    votes: {},
    private: false,
  },
  ]);
  const [blogs, setBlogs] = useState([{
    title: 'Example 1',
    description: 'This is the first blog.',
    username: user,
    date: 'TIMESTAMP',
    keywords: 'example, cool, stylish',
    private: '0',
  }, {
    title: 'Example 2',
    description: 'This is the second blog.',
    username: user,
    date: 'TIMESTAMP',
    keywords: 'example, cool, stylish',
    private: '0',
  }, {
    title: 'Example 3',
    description: 'This is the third blog.',
    username: user,
    date: 'TIMESTAMP',
    keywords: 'example, cool, stylish',
    private: '0',
  }]);
  useEffect(() => {
    axios.get(`/videos/${user}`)
      .then((data) => {
        setVideos(data.data);
      })
      .then(() => {
        axios.get(`/blogs/${user}`);
      })
      .then((data) => {
        setBlogs(data.data);
      });
  });
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <AboutMe user={user} />
        </div>
        <div className="col-md-8">
          <VideoCarousel videos={videos} />
          <BlogCarousel blogs={blogs} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
