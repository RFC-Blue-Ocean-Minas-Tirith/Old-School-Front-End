/* eslint-disable react/self-closing-comp */
/* eslint-disable react/prop-types */
function VideoCarouselEntry({ video }) {
  return (
    <div className="video-carousel-video card center-block">
      <img src={video.thumbnail} width="250px" height="250px" style={{ 'object-fit': 'cover' }} alt="video" />
      <div className="card-body">
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
