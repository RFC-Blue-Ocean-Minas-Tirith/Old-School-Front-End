import * as utils from '../../utils/LiveStream.js';

import {listDevices, initLiveStream, attachCamera, detachCamera, getStream} from '@cloudinary/js-streaming';
import React from 'react';
import { useState, useEffect } from 'react';

function LiveChatPage() {



  useEffect(() => {
    const script = document.createElement('script');
    script.src = "../../utils/LiveStream.js";
    script.async = false;
    document.body.appendChild(script);
    return () => {
        document.body.removeChild(script);
      }
  }, []);

  return (
    <div>
      <title>Cloudinary Live Streaming Example</title>
      <script src="js-streaming.js"></script>
    <div className="center-text">
    <div className="container wrapper">
    <h1>Cloudinary Live Streaming Example</h1>
    <p>This demo requires HTTPS on some environments</p>
    <div className="video-wrapper">
        <video className="video" id="video" autoPlay muted="muted" playsInline></video>
    </div>
    <div className="center">
        <div className="center-text">
            <label htmlFor="devices">Select Camera:</label>
        </div>
        <div className="center-text">
            <select id="devices"></select>
        </div>
        <div className="ui">
            <p>Status: <span id="status">Click on 'initialize Stream' to begin</span></p>
            <p>Public Id: <span id="publicid"></span></p>
            <p>File url: <a id="file_url" target="_blank"></a></p>
            <p>Stream url: <a id="stream_url" target="_blank"></a></p>
        </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default LiveChatPage;