import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Container, Heading } from './Modals.styled';
import Theme from './Theme';
import UploadBlog from './UploadBlog';
import UploadVideo from './UploadVideo';

function Upload(props) {
  const [modalShow, setModalShow] = useState(false);
  const [videoModalShow, setVideoModalShow] = useState(false);
  const [blogModalShow, setBlogModalShow] = useState(false);

  return (
    <Theme>
      <Container>
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Upload:
              <br />
              <Button onClick={() => setVideoModalShow(true)}>Video</Button>
              <br />
              <Button onClick={() => setBlogModalShow(true)}>Blog</Button>
            </Modal.Title>
          </Modal.Header>
        </Modal>
        <UploadVideo videoModalShow={videoModalShow} setVideoModalShow={setVideoModalShow}/>
        <UploadBlog blogModalShow={blogModalShow}
        setBlogModalShow={setBlogModalShow}
        setModalShow={setModalShow}/>
        <Button variant="primary" onClick={() => setModalShow(true)} setBlogModalShow={setBlogModalShow}>Upload</Button>
      </Container>
    </Theme>
  );
}

export default Upload;
