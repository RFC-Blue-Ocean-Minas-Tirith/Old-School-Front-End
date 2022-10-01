import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function UploadBlog(props) {
  const [body, setBody] = useState();
  const [title, setTitle] = useState();
  const [keywords, setKeywords] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);

  function handleChange(event) {
    setBody(event.target.value);
  }

  function handleAdd(event) {
    // console.log(event.timeStamp);
    // console.log(comment);
    // const body = {
    //   'author' : props.username,
    //   'title' : title;
    //   'body' : body,
    //   'date' : event.timeStamp,
    //   'keywords' : keywords,
    //   'private' : isPrivate
    //  };
    // axios.post('/blog', body)
    //   .then((results) => {
    //     console.log(results);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
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
        <form>
          <label>Title:
            <input type="text" placeholder="Title" />
            </label>
            <label> Blog Post:
            <textarea rows="4" cols="50" placeholder="Write your post here..." onChange={handleChange}/>
            </label>
            <label>Keywords:
            <input type="text" data-role="taginput" data-tag-trigger="Space"></input>
            </label>
            <label>Private
            <input type="checkbox"></input>
          </label>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAdd}>Add</Button>
        <Button onClick={() => props.setModalShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>

  )
}

export default UploadBlog;
