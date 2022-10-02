import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Tags, Input, Tag, TagButton, Row } from './Modals.styled'

const initialValues = {
  description: "",
  title: "",
}

function UploadBlog(props) {
  // const [body, setBody] = useState();
  // const [title, setTitle] = useState();
  // const [keywords, setKeywords] = useState([]);
  // const [isPrivate, setIsPrivate] = useState(false);
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

  function handlePrivate(e) {
    setIsPrivate(!isPrivate);
  }

  function handleKeywords(e) {
    console.log(e);
  }

  function handleAdd(event) {
    // console.log(event.timeStamp);
    // console.log(comment);
    // const params = {
    //   'author' : props.username,
    //   'title' : values.title;
    //   'description' : values.description,
    //   'date' : event.timeStamp,
    //   'keywords' : keywords,
    //   'private' : isPrivate
    //  };
    // axios.post('/blog', params)
    //   .then((results) => {
    //     console.log(results);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
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

    if (key === "Backspace" && !keyword.length && keywords.length) {
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
          Upload a Blog
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <label>
            Title:
            <input type="text" placeholder="Title" name="title" value={values.title} onChange={handleInputChange} />
          </label>
          <label>
            Private
            <input type="checkbox" name="private" value={values.private} onChange={handlePrivate} />
          </label>
          <label>
            Blog Post:
            <textarea rows="4" cols="50" placeholder="Write your post here..." name="description" value={values.description} onChange={handleInputChange} />
          </label>
          <label>Keywords:</label>
          <Input value={keyword} placeholder="Enter a keyword followed by a comma..." onKeyDown={onKeyDown} onKeyUp={onKeyUp} onChange={onChange} />
          {keywords.length > 0 && <Tags>
            <Row>
            {keywords.map((word, index) => (
              <Tag key={index}>
                {word}
                <TagButton onClick={() => deleteTag(index)}>x</TagButton></Tag>
            ))}
            </Row>
          </Tags>}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAdd}>Add</Button>
        <Button onClick={() => props.setBlogModalShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>

  )
}

export default UploadBlog;
