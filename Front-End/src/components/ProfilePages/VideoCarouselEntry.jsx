/* eslint-disable */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

function VideoCarouselEntry({ video, currentUser }) {
  return (
    <div className="video-carousel-video card center-block">
      <div className="card-body">
      <Link to="/video_page" className="nav-link active" aria-current="page" state={{currentUser: currentUser, video: video}}>
      <img src={video.thumbnail} width="250px" height="250px" style={{ objectFit: 'cover' }} alt="video" className="card-img-top" />
      </Link>
        <div className="card-title text-center">
          {video.title}
        </div>
        <div className="card-text">
          {video.description}
        </div>
      </div>
    </div>
  );
}

export default VideoCarouselEntry;
