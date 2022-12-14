/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable semi */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Tags, Input, Tag, TagButton, Row2, Column, RightLabel, LeftLabel, Checkbox } from './Modals.styled';
import emailjs from '@emailjs/browser';
import { cloudName, uploadPreset, serviceID, templateID, publicKey } from './config';

const initialValues = {
  description: '',
  title: '',
}

function UploadVideo(props) {
  const [values, setValues] = useState(initialValues);
  const [isPrivate, setIsPrivate] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubmitted(false);
    setValues(initialValues);
    setIsPrivate(false);
    setKeywords([]);
    setKeyword('');
    setVideoUrl('');
  }, [props.setModalShow]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function handlePrivate(e) {
    setIsPrivate(!isPrivate);
  }

  function checkUploadResult(resultEvent) {
    if (resultEvent.event === 'success') {
      console.log('Done! Video info: ', resultEvent.info)
      setVideoUrl(resultEvent.info.url);
      setThumbnailUrl(resultEvent.info.thumbnail_url);
    };
  }

  const myWidget = cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
      sources: ['local', 'url', 'google_drive'],
    },
    (error, result) => { checkUploadResult(result); },
  );

  function showWidget() {
    myWidget.open();
  }

  function handleAdd(event) {
    let votesInfo = {
      insightful: {
        usernames: [],
        count: 0,
      },
      funny: {
        usernames: [],
        count: 0,
      },
      informative: {
        usernames: [],
        count: 0,
      }
    }
    const params = {
      params: {
        username: props.currentUser.username,
        title: values.title,
        description: values.description,
        dateUploaded: new Date(),
        keywords,
        private: isPrivate,
        url: videoUrl,
        votes: votesInfo,
        thumbnail: thumbnailUrl,
      }
    }
    axios.post('http://localhost:8080/video', params)
      .then(() => {
        props.setModalShow(false);
        setSubmitted(true)
      })
    .then(() => {
      axios.get('http://localhost:8080/usersForFaveCreator', {
        params: {
          favoriteUser: props.currentUser.username,
        },
      })
    })
    .then((response) => {
      for (let user of response.data) {
        setTimeout(() => {
          const templateParams = {
            currentUser: user.email,
            faveCreator: props.currentUser.username,
            to_name: user.username,
            from_name: 'Old School',
          }
          emailjs.send(serviceID, templateID, templateParams, publicKey)
          .then((result) => {
            console.log(result.text);
          })
          .catch((err) => {
            console.log(err);
          })
        }, 1010)
      }
    })
  }


const onChange = (e) => {
  const { value } = e.target;
  setKeyword(value);
};

const onKeyDown = (e) => {
  const { key } = e;
  const trimmedInput = keyword.trim();

  if (key === ',' && trimmedInput.length && !keywords.includes(trimmedInput)) {
    e.preventDefault();
    setKeywords(prevState => [...prevState, trimmedInput]);
    setKeyword('');
  }

  if (key === "Backspace" && !keyword.length && keywords.length && isKeyReleased) {
    e.preventDefault();
    const keywordsCopy = [...keywords];
    const poppedTag = keywordsCopy.pop();

    setKeywords(keywordsCopy);
    setKeyword(poppedTag);
  }

  setIsKeyReleased(false);
};

const onKeyUp = () => {
  setIsKeyReleased(true);
}

const deleteTag = (index) => {
  setKeywords(prevState => prevState.filter((tag, i) => i !== index));
}

  if (submitted) {
    return (
      <Modal
        show={props.videoModalShow}
        onHide={() => props.setVideoModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header id="contained-modal-title-vcenter" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add a Video
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Video Submitted!</h2>
          <h4>Video Title: </h4> {values.title}
          <h4>Video Description: </h4> {values.description}
        </Modal.Body>
        <Modal.Footer>
          <Button id="clickButton" onClick={() => {
            props.setVideoModalShow(false);
          }}>
            Close
          </Button>
        </Modal.Footer>
    </Modal>
  )
} else {
  return (
      <Modal
        show={props.videoModalShow}
        onHide={() => props.setVideoModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header id="contained-modal-title-vcenter" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add a Video
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Column>
            <Row2>
              <LeftLabel>
                Title:
              </LeftLabel>
              <input type="text" placeholder="Title" name="title" onChange={handleInputChange}/>
              <RightLabel>
                Private
              </RightLabel>
              <Checkbox type="checkbox" onChange={handlePrivate} />
            </Row2>
            <LeftLabel>
              Description:
            </LeftLabel>
            <textarea rows="4" cols="50" placeholder="Write your description here..." onChange={handleInputChange} name="description"/>
            <LeftLabel>Video: </LeftLabel>
            <button id="clickButton" type="button" onClick={showWidget}>Upload</button>
            <LeftLabel>Keywords:</LeftLabel>
            <Input value={keyword} placeholder="Enter a keyword followed by a comma ','" onKeyDown={onKeyDown} onKeyUp={onKeyUp} onChange={onChange} />
            {keywords.length > 0 && (
            <Tags>
              <Row2>
                {keywords.map((word, index) => (
                  <Tag key={index}>
                    {word}
                    <TagButton id="clickButton" onClick={() => deleteTag(index)}>x</TagButton></Tag>
                ))}
              </Row2>
            </Tags>
            )}
          </Column>
        </Modal.Body>
        <Modal.Footer>
          <Button id="clickButton" onClick={handleAdd}>Add</Button>
          <Button id="clickButton" onClick={() => {
            props.setVideoModalShow(false);
          }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
  }

export default UploadVideo;
