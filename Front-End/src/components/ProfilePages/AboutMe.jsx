/* eslint-disable */
/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { signInWithGoogle } from './../Navbar/firebase.js';

function AboutMe({ user, currentUser }) {
  const [faved, setFaved] = useState(false)
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState('');
  function handleBioWriting(e) {
    setBio(e.target.value)
  };
  function bioSubmit() {
    return axios.put(`http://localhost:8080/userprofile/${user.username}`, { user: user.username, bio: bio })
      .then(() => {
        user.aboutMe = bio;
        setEditing(false);
      })
  }

  function handleFave() {
    if (currentUser) {
      return axios.put('http://localhost:8080/userprofile', { currentUser: currentUser, user: user.username })
      .then((data) => {
        setFaved(true);
      })
    }
    signInWithGoogle();
  }

  function handleUnfave() {
    if (currentUser) {
      return axios.put('http://localhost:8080/userprofilex', { currentUser: currentUser, user: user.username})
        .then((data) => {
          setFaved(false);
        })
    }
    signInWithGoogle();
  }

  useEffect(() => {
    if (currentUser) {
      if (currentUser.favCreator) {
        if (currentUser.favCreator.indexOf(user.username) !== -1) {
          setFaved(true)
        }
      }
    }
  })
  console.log(user, currentUser.username);
  if (currentUser) {
    if (user.username === currentUser.username) {
      if (editing) {
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
            <label for="Biography Text Area"></label>
            <textarea class="form-control" rows="10" placeholder="Write your bio here..." onChange={(e) => {handleBioWriting(e)}}></textarea>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-5">
              <button id="redButton" type="button" className="btn btn-primary me-2" onClick={() => {bioSubmit()}}>Submit</button>
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
            <button id="redButton" type="button" className="btn btn-primary me-2" onClick={() => {setEditing(true)}}>Edit</button>
          </div>
        </div>
      </div>
      )
    }
  }
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
        <button id="redButton" type="button" className="btn btn-primary me-2" onClick={() => {handleFave()}}>Favorite This Creator</button>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
