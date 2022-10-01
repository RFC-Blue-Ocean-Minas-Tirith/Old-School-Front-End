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

function VideoCarousel({ videos }) {
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
              <VideoCarouselEntry video={video} index={index} vids={vids} />
            ))}
          </div>
        </div>
      );
    }
  }
  if (currentVids.place === 0) {
    return (
      <div className="container">
        <h2 className="text-center"> Video Posts </h2>
        <div className="vid-carousel">
          {currentVids.vids.map((video, index, vids) => (
            <VideoCarouselEntry video={video} index={index} vids={vids} />
          ))}
        </div>
        <a className="col next" onClick={() => { sortThumbs(currentVids.place + 1) }}>&#10095;</a>
      </div>
    );
  }
  if (currentVids.place + 3 === videos.length) {
    return (
      <div className="container">
        <h2 className="text-center"> Video Posts </h2>
        <a className="prev" onClick={() => { sortThumbs(currentVids.place - 1) }}>&#10094;</a>
        <div className="vid-carousel">
          {currentVids.vids.map((video, index, vids) => (
            <VideoCarouselEntry video={video} index={index} vids={vids} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="container">
      <h2 className="text-center"> Video Posts </h2>
      <a className="prev" onClick={() => { sortThumbs(currentVids.place - 1) }}>&#10094;</a>
      <div className="vid-carousel">
        {currentVids.vids.map((video, index, vids) => (
          <VideoCarouselEntry video={video} index={index} vids={vids} />
        ))}
      </div>
      <a className="next" onClick={() => { sortThumbs(currentVids.place + 1) }}>&#10095;</a>
    </div>
  );
}

export default VideoCarousel;
