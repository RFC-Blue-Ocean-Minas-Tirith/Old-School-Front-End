/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCarousel from './BlogCarousel';
import VideoCarousel from './VideoCarousel';
import AboutMe from './AboutMe';

function ProfilePage({ user, currentUser }) {
  // ProfilePage.PropTypes = { user: PropTypes.obj.isRequired }
  const [videos, setVideos] = useState([{
    title: 'Example 1',
    description: 'Love this video!',
    username: 'AllEyesBlank',
    date: 'TIMESTAMP',
    keywords: ['example', 'trendy', 'old'],
    comments: {},
    thumbnail: 'https://res.cloudinary.com/dwl50vubn/image/upload/v1664643111/Screen_Shot_2022-10-01_at_11.50.47_AM_ztuwta.png',
    url: 'https://youtu.be/fstH84wRwpo',
    votes: {},
    private: false,
  }, {
    title: 'Example 2',
    description: 'Love THAT video!',
    username: 'AllEyesBlank',
    date: 'date',
    keywords: ['example', 'trendy', 'old'],
    comments: {},
    thumbnail: 'https://res.cloudinary.com/dwl50vubn/image/upload/v1664643214/Screen_Shot_2022-10-01_at_11.53.08_AM_i62erk.png',
    url: 'https://youtu.be/LLGdFAQ0RmU',
    votes: {},
    private: false,
  }, {
    title: 'Example 3',
    description: 'This ones okay!',
    username: 'AllEyesBlank',
    date: 'date',
    keywords: ['example', 'sweet', 'nifty'],
    comments: {},
    thumbnail: 'https://res.cloudinary.com/dwl50vubn/image/upload/v1664643379/Screen_Shot_2022-10-01_at_11.55.49_AM_pezhch.png',
    url: 'https://youtu.be/4tuDwbDMidM',
    votes: {},
    private: false,
  },
  {
    title: 'Another video',
    description: 'Wild',
    username: 'AllEyesBlank',
    date: 'date',
    keywords: ['example', 'cool', 'stylish'],
    comments: {},
    thumbnail: 'https://res.cloudinary.com/dwl50vubn/image/upload/v1664643470/Screen_Shot_2022-10-01_at_11.57.25_AM_kuwii9.png',
    url: 'https://youtu.be/zZaurMNo5l0',
    votes: {},
    private: false,
  },
  {
    title: 'A Fifth Video',
    description: 'It is the video',
    username: 'AllEyesBlank',
    date: 'date',
    keywords: ['example', 'cool', 'stylish'],
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
    username: 'AllEyesBlank',
    dateUploaded: '',
    keywords: ['example', 'cool', 'stylish'],
    private: '0',
  }, {
    title: 'Example 2',
    description: 'This is the second blog.',
    username: 'AllEyesBlank',
    dateUploaded: '',
    keywords: ['example', 'sweet', 'nifty'],
    private: '0',
  }, {
    title: 'Example 3',
    description: 'This is the third blog.',
    username: 'AllEyesBlank',
    dateUploaded: '',
    keywords: ['example', 'trendy', 'old'],
    private: '0',
  },
  {
    title: 'Example 4',
    description: 'This is the fourth blog.',
    username: 'AllEyesBlank',
    dateUploaded: '',
    keywords: ['example', 'trendy', 'old'],
    private: '0',
  },
  {
    title: 'Example 5',
    description: 'This is the fifth blog.',
    username: 'AllEyesBlank',
    dateUploaded: '',
    keywords: ['example', 'trendy', 'old'],
    private: '0',
  }]);
  // useEffect(() => {
  //   axios.get(`/videos/${user}`)
  //     .then((data) => {
  //       setVideos(data.data);
  //     })
  //     .then(() => {
  //       axios.get(`/blogs/${user}`);
  //     })
  //     .then((data) => {
  //       setBlogs(data.data);
  //     });
  // });
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <AboutMe user={user} currentUser={currentUser} />
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
