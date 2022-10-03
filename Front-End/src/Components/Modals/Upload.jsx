import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LargeButton } from './Modals.styled';
import Theme from './Theme';
import UploadBlog from './UploadBlog';
import UploadVideo from './UploadVideo';

function Upload(props) {
  const [modalShow, setModalShow] = useState(false);
  const [videoModalShow, setVideoModalShow] = useState(false);
  const [blogModalShow, setBlogModalShow] = useState(false);

  return (
    <Theme>
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
            <LargeButton onClick={() => setVideoModalShow(true)}>Video</LargeButton>
            <LargeButton onClick={() => setBlogModalShow(true)}>Blog</LargeButton>
            <LargeButton>Livestream</LargeButton>
          </Modal.Title>
        </Modal.Header>
      </Modal>
      <UploadVideo
        videoModalShow={videoModalShow}
        setVideoModalShow={setVideoModalShow}
        setModalShow={setModalShow} />
      <UploadBlog
        blogModalShow={blogModalShow}
        setBlogModalShow={setBlogModalShow}
        setModalShow={setModalShow} />
      <Button variant="primary" onClick={() => setModalShow(true)}>Upload</Button>
    </Theme>
  );
}

export default Upload;
