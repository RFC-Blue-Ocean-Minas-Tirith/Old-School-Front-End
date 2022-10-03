/* eslint-disable */
/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';

function AboutMe({ user, currentUser }) {
  const [faved, setFaved] = useState(false)
  function handleFave() {
    return axios.put('http://localhost:8080/userprofile', { currentUser: currentUser, user: user })
      .then((data) => {
        setFaved(true);
      })
  }

  function handleUnfave() {
    return axios.put('http://localhost:8080/userprofilex', { currentUser: currentUser, user: user})
      .then((data) => {
        setFaved(false);
      })
  }

  useEffect(() => {
    if (currentUser.favCreator.indexOf(user.username) !== -1) {
      setFaved(true)
    }
  })

  if (faved) {
    return (
      <div className="container">
      <div className="row">
        <div className="text-center">
          <img
            src={user.profilePicture}
            alt={user.username}
            style={
              {
                borderRadius: '50%', height: '300px', width: '300px', objectFit: 'cover',
              }
              }
            className="image-responsive"
            data-holder-rendered="true"
          />
        </div>
      </div>
      <div className="row">
        <h1 className="text-center">{user.username}</h1>
      </div>
      <div className="row">
      </div>
      <div className="row">
        <p className="text-center">{user.aboutMe}</p>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <button type="button" className="btn btn-primary me-2" onClick={() => {handleUnfave()}}>You've favorited this creator.</button>
        </div>
      </div>
    </div>
    )
  }
  return (
    <div className="container">
      <div className="row">
        <div className="text-center">
          <img
            src={user.profilePicture}
            alt={user.username}
            style={
              {
                borderRadius: '50%', height: '300px', width: '300px', objectFit: 'cover',
              }
              }
            className="image-responsive"
            data-holder-rendered="true"
          />
        </div>
      </div>
      <div className="row">
        <h1 className="text-center">{user.username}</h1>
      </div>
      <div className="row">
      </div>
      <div className="row">
        <p className="text-center">{user.aboutMe}</p>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-5">
        <button type="button" className="btn btn-primary me-2" onClick={() => {handleFave()}}>Favorite This Creator</button>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
