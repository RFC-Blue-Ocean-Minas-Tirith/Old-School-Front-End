import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function UploadVideo(props) {
  function checkUploadResult(resultEvent) {
    if (resultEvent.event === 'success') {
      // console.log(resultEvent.info.url);

      // send post request
      // var body = {
      //   'video' : resultEvent.info.url
      // }
      // axios.post('/videos', body)
      //   .then((result) => {
      //     console.log('posted')
      //   })
      //   .catch((err) => {
      //     console.log('error')
      //   })
    };
  }

  const myWidget = cloudinary.createUploadWidget(
    {
      cloudName: 'dulhjtu0p',
      uploadPreset: 'cxb3dbqr',
    },
    (error, result) => { checkUploadResult(result); },
  );

  function showWidget() {
    myWidget.open();
  }

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
          <button onClick={showWidget}>Upload Video</button>
        </Modal.Body>
      </Modal.Header>
    </Modal>
  )
}

export default UploadVideo;
