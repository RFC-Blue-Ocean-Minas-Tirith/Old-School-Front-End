/* eslint-disable */
/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { Col, Row, Container, Button, Badge, ListGroup } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import { signInWithGoogle } from './../Navbar/firebase.js';

function AboutMe({ user, currentUser }) {
  const [faved, setFaved] = useState(false)
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [favorited, setFavorited] = useState(['unfavorited', 'Favorite this Creator!']);
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
    if (Object.keys(currentUser).length) {
      return axios.put('http://localhost:8080/userprofile', { currentUser: currentUser, user: user.username })
      .then((data) => {
        setFaved(true);
      })
    }
    signInWithGoogle();
  }

  function handleUnfave() {
    if (Object.keys(currentUser).length) {
      return axios.put('http://localhost:8080/userprofilex', { currentUser: currentUser, user: user.username})
        .then((data) => {
          setFaved(false);
        })
    }
    signInWithGoogle();
  }

  useEffect(() => {
    if (currentUser) {
      axios.get(`http://localhost:8080/user/favs`, {
        params: {
          user: currentUser.username
        }
      })
      .then(({ data }) => {
        if (data.indexOf(user.username) !== -1) {
          setFaved(true);
        }
      })
    }
  }, [user])

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
          <div className="row text-center justify-content-center">
            <div className="col-md-5">
              <button id="redButton" type="button" className="btn btn-primary me-2" onClick={() => {bioSubmit()}}>Submit</button>
            </div>
          </div>
        </div>
        )
      }
      return (
        <div id="about-me-container" className="container">
        <div id="about-me-picture" className="row">
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
        <div id="about-me-user" className="row">
          <h1 className="text-center">{user.username}</h1>
        </div>
        <div className="row">
        </div>
        <div id="about-me-bio" className="row">
          <p className="text-center">{user.aboutMe}</p>
        </div>
        <div className="row text-center justify-content-center">
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
          <Badge id='favorited' className="border border-warning" pill bg="warning" text="dark" onClick={() => {handleUnfave()}}>This is one of your Favorite Creators.</Badge>
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
        <Badge id={favorited[0]} className="border border-warning" pill bg="warning" text="dark" onClick={() => {handleFave()}}>Favorite this Creator!</Badge>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
