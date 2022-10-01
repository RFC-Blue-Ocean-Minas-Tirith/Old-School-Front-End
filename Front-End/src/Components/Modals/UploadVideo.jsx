import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function UploadVideo(props) {
  return (
    <Modal
      show={props.videoModalShow}
      onHide={() => props.setVideoModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Video
        </Modal.Title>
        <Modal.Body>

        </Modal.Body>
      </Modal.Header>
    </Modal>
  )
}

export default UploadVideo;
