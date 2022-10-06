import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LargeButton, ColumnCentered } from './Modals.styled';
import Theme from './Theme';
import UploadBlog from './UploadBlog';
import UploadVideo from './UploadVideo';

function Upload(props) {
  const [videoModalShow, setVideoModalShow] = useState(false);
  const [blogModalShow, setBlogModalShow] = useState(false);

  const handleClose = () => props.setModalShow(false);

  return (
    <Theme>
      <Modal
        show={props.modalShow}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header id="contained-modal-title-vcenter" closeButton>
          <Modal.Title >
            Upload:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ColumnCentered>
            <Button id="largeButton" onClick={() => setVideoModalShow(true)}>Video</Button>
            <Button id="largeButton" onClick={() => setBlogModalShow(true)}>Blog</Button>
            {/* <Button id="largeButton">Livestream</Button> */}
          </ColumnCentered>
        </Modal.Body>
        <Modal.Footer>
          <Button id="clickButton" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      <UploadVideo
        videoModalShow={videoModalShow}
        setVideoModalShow={setVideoModalShow}
        setModalShow={props.setModalShow} username={props.currentUser.username} />
      <UploadBlog
        blogModalShow={blogModalShow}
        setBlogModalShow={setBlogModalShow}
        setModalShow={props.setModalShow} username={props.currentUser.username} />
    </Theme>
  );
}

export default Upload;
