/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable semi */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import VideoCarouselEntry from './VideoCarouselEntry';

function VideoCarousel({ videos, currentUser }) {
  const [currentVids, setCurrentVids] = useState({ vids: [], place: 0 });
  function sortThumbs(num) {
    if (videos.length < 3) {
      setCurrentVids({ vids: videos, place: 0 });
      return;
    }
    setCurrentVids({ vids: videos.slice(num, num + 3), place: num });
  }
  useEffect(() => {
    if (videos.indexOf(currentVids.vids[currentVids.place]) === -1) {
      sortThumbs(0);
    }
  });

  if (currentVids.place === 0) {
    if (videos.length < 3) {
      return (
        <div className="container">
          <h2 className="text-center"> Video Posts </h2>
          <div className="vid-carousel">
            {currentVids.vids.map((video, index, vids) => (
              // eslint-disable-next-line max-len
              <VideoCarouselEntry video={video} index={index} vids={vids} currentUser={currentUser} />
            ))}
          </div>
        </div>
      );
    }
  }
  if (currentVids.place === 0) {
    return (
      <div className="container-fluid">
        <h2 className="text-center"> Video Posts </h2>
        <div className="row justify-content-between">
          <div className="col-2"></div>
          <div className="col-2">
            <button type="button" className="btn btn-primary me-2" onClick={() => { sortThumbs(currentVids.place + 1) }}>More Videos</button>
          </div>
        </div>
        <div className="vid-carousel">
          {currentVids.vids.map((video, index, vids) => (
            <VideoCarouselEntry video={video} index={index} vids={vids} currentUser={currentUser} />
          ))}
        </div>
      </div>
    );
  }
  if (currentVids.place + 3 === videos.length) {
    return (
      <div className="container-fluid">
        <h2 className="text-center"> Video Posts </h2>
        <div className="row justify-content-between">
          <div className="col-2">
            <button type="button" className="btn btn-primary me-2" onClick={() => { sortThumbs(currentVids.place - 1) }}>Prev Videos</button>
          </div>
          <div className="col"></div>
        </div>
        <div className="vid-carousel">
          {currentVids.vids.map((video, index, vids) => (
            <VideoCarouselEntry video={video} index={index} vids={vids} currentUser={currentUser} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="container-fluid">
      <h2 className="text-center"> Video Posts </h2>
      <div className="row justify-content-between">
        <div className="col-2">
          <button type="button" className="btn btn-primary me-2" onClick={() => { sortThumbs(currentVids.place - 1) }}>Prev Videos</button>
        </div>
        <div className="col-2">
          <button type="button" className="btn btn-primary me-2" onClick={() => { sortThumbs(currentVids.place + 1) }}>More Videos</button>
        </div>
      </div>
      <div className="vid-carousel">
        {currentVids.vids.map((video, index, vids) => (
          <VideoCarouselEntry video={video} index={index} vids={vids} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
}

export default VideoCarousel;
