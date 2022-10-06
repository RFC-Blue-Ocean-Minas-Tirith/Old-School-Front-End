import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Tags, Input, Tag, TagButton, Row, Column, RightLabel, LeftLabel, Checkbox } from './Modals.styled';
import { cloudName, uploadPreset } from './config';

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
  }, [props]);

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
      },
    };
    const params = {
      params: {
        username: props.username,
        title: values.title,
        description: values.description,
        dateUploaded: new Date(),
        keywords,
        private: isPrivate,
        url: videoUrl,
        votes: votesInfo,
        thumbnail: thumbnailUrl,
      },
    };
    axios.post('http://ec2-18-217-242-14.us-east-2.compute.amazonaws.com/video', params)
      .then(() => {
        console.log('submitted')
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
      });
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
            <Row>
              <LeftLabel>
                Title:
              </LeftLabel>
              <input type="text" placeholder="Title" name="title" onChange={handleInputChange}/>
              <RightLabel>
                Private
              </RightLabel>
              <Checkbox type="checkbox" onChange={handlePrivate} />
            </Row>
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
              <Row>
                {keywords.map((word, index) => (
                  <Tag key={index}>
                    {word}
                    <TagButton id="clickButton" onClick={() => deleteTag(index)}>x</TagButton></Tag>
                ))}
              </Row>
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
