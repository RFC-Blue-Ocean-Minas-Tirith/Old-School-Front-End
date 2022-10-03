import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Tags, Input, Tag, TagButton, Row, Column, RightLabel, LeftLabel, Checkbox } from './Modals.styled';
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
      }
    };
    axios.post('http://localhost:8080/blog', params)
      .then((results) => {
        console.log(results);
        setValues(initialValues);
        setIsPrivate(false);
        setKeywords([]);
        setKeyword('');
        props.setBlogModalShow(false);
        props.setModalShow(false);
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
            <Row>
              <LeftLabel>
                Title:
              </LeftLabel>
              <input type="text" placeholder="Title" name="title" value={values.title} onChange={handleInputChange} />
              <RightLabel>
                Private
              </RightLabel>
              <Checkbox type="checkbox" name="private" value={values.private} onChange={handlePrivate} />
            </Row>
            <LeftLabel>
              Blog Post:
            </LeftLabel>
            <textarea rows="4" cols="50" placeholder="Write your post here..." name="description" value={values.description} onChange={handleInputChange} />
            <LeftLabel>Keywords:</LeftLabel>
            <Input value={keyword} placeholder="Enter a keyword followed by a comma ','" onKeyDown={onKeyDown} onKeyUp={onKeyUp} onChange={onChange} />
            {keywords.length > 0 && (
            <Tags>
              <Row>
                {keywords.map((word, index) => (
                  <Tag key={index}>
                    {word}
                    <TagButton onClick={() => deleteTag(index)}>x</TagButton></Tag>
                ))}
              </Row>
            </Tags>
            )}
          </form>
        </Column>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAdd}>Add</Button>
        <Button onClick={() => {
          setValues(initialValues);
          setIsPrivate(false);
          setKeywords([]);
          setKeyword('');
          props.setBlogModalShow(false);
        }}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UploadBlog;
