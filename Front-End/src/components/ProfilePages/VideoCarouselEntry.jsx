/* eslint-disable */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

function VideoCarouselEntry({ video, currentUser }) {
  let thumb = video.url.replace('.mp4', '.jpg');
  return (
    <div className="video-carousel-video card center-block">
      <div className="card-body" style={{ maxWidth: '300px'}}>
      <Link to="/video_page" className="nav-link active" aria-current="page" state={{currentUser: currentUser, video: video}}>
      <img src={thumb} width="250px" height="250px" style={{ objectFit: 'cover' }} alt="video" className="card-img-top" />
      </Link>
        <div id="carousel-card-title" className="card-title text-center">
          {video.title}
        </div>
        <div id="carousel-card-title" className="card-text">
          {video.description}
        </div>
      </div>
    </div>
  );
}

export default VideoCarouselEntry;
