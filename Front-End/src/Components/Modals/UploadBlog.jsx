import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Tags, Input, Tag, TagButton, Row2, Column, RightLabel, LeftLabel, Checkbox } from './Modals.styled';
import axios from 'axios';

const initialValues = {
  description: '',
  title: '',
};

function UploadBlog(props) {
  const [values, setValues] = useState(initialValues);
  const [isPrivate, setIsPrivate] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSubmitted(false);
    setValues(initialValues);
    setIsPrivate(false);
    setKeywords([]);
    setKeyword('');
  }, [props.setModalShow]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function handlePrivate() {
    setIsPrivate(!isPrivate);
  }

  function handleAdd(event) {
    const params = {
      params: {
        username: props.username,
        title: values.title,
        description: values.description,
        dateUploaded: new Date(),
        keywords,
        private: isPrivate,
      },
    };
    axios.post('http://localhost:8080/blog', params)
      .then(() => {
        props.setModalShow(false);
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

    if (key === 'Backspace' && !keyword.length && keywords.length && isKeyReleased) {
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
  };

  const deleteTag = (index) => {
    setKeywords((prevState) => prevState.filter((tag, i) => i !== index));
  };

  if (submitted) {
    return (
      <Modal
        show={props.blogModalShow}
        onHide={() => props.setBlogModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add a Blog Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Blog Post Submitted!</h2>
          <h4>Blog Title: </h4> {values.title}
          <h4>Blog Post: </h4> {values.description}
        </Modal.Body>
        <Modal.Footer>
          <Button id="redButton" onClick={() => {
            props.setBlogModalShow(false);
          }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )} else {
    return (
      <Modal
        show={props.blogModalShow}
        onHide={() => props.setBlogModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add a Blog Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Column>
            <form>
              <Row2>
                <LeftLabel>
                  Title:
                </LeftLabel>
                <input type="text" placeholder="Title" name="title" value={values.title} onChange={handleInputChange} />
                <RightLabel>
                  Private
                </RightLabel>
                <Checkbox type="checkbox" name="private" value={values.private} onChange={handlePrivate} />
              </Row2>
              <LeftLabel>
                Blog Post:
              </LeftLabel><br />
              <textarea rows="4" cols="50" placeholder="Write your post here..." name="description" value={values.description} onChange={handleInputChange} /><br />
              <LeftLabel>Keywords:</LeftLabel><br />
              <Input value={keyword} placeholder="Enter a keyword followed by a comma ','" onKeyDown={onKeyDown} onKeyUp={onKeyUp} onChange={onChange} />
              {keywords.length > 0 && (
              <Tags>
                <Row2>
                  {keywords.map((word, index) => (
                    <Tag key={index}>
                      {word}
                      <TagButton onClick={() => deleteTag(index)}>x</TagButton></Tag>
                  ))}
                </Row2>
              </Tags>
              )}
            </form>
          </Column>
        </Modal.Body>
        <Modal.Footer>
          <Button id="redButton" onClick={handleAdd}>Add</Button>
          <Button id="redButton" onClick={() => {
            props.setBlogModalShow(false);
          }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
  }
}

export default UploadBlog;
