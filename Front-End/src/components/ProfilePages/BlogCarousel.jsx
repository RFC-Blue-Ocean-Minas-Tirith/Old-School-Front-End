/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable semi */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react';
import BlogCarouselEntry from './BlogCarouselEntry';

function BlogCarousel({ blogs }) {
  const [currentBlgs, setCurrentBlgs] = useState({ blgs: [], place: 0 });
  function sortThumbs(num) {
    if (blogs.length < 3) {
      setCurrentBlgs({ blgs: blogs, place: 0 });
      return;
    }
    setCurrentBlgs({ blgs: blogs.slice(num, num + 3), place: num });
  }
  useEffect(() => {
    if (blogs.indexOf(currentBlgs.blgs[currentBlgs.place]) === -1) {
      sortThumbs(0);
    }
  });

  if (currentBlgs.place === 0) {
    if (blogs.length <= 3) {
      return (
        <div>
          <h2 className="text-center"> Blog Posts </h2>
          <div className="vid-carousel">
            {currentBlgs.blgs.map((blog, index, blgs) => (
              <BlogCarouselEntry blog={blog} index={index} blgs={blgs} />
            ))}
          </div>
        </div>
      );
    }
  }
  if (currentBlgs.place === 0) {
    return (
      <div>
        <h2 className="text-center"> Blog Posts </h2>
        <a className="next" onClick={() => { sortThumbs(currentBlgs.place + 1) }}>&#10095;</a>
        <div className="vid-carousel">
          {currentBlgs.blgs.map((blog, index, blgs) => (
            <BlogCarouselEntry blog={blog} index={index} blgs={blgs} />
          ))}
        </div>
      </div>
    );
  }
  if (currentBlgs.place + 3 === blogs.length) {
    return (
      <div>
        <h2 className="text-center"> Blog Posts </h2>
        <a className="prev" onClick={() => { sortThumbs(currentBlgs.place - 1) }}>&#10094;</a>
        <div className="vid-carousel">
          {currentBlgs.blgs.map((blog, index, blgs) => (
            <BlogCarouselEntry blog={blog} index={index} blgs={blgs} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-center"> Blog Posts </h2>
      <a className="prev" onClick={() => { sortThumbs(currentBlgs.place - 1) }}>&#10094;</a>
      <a className="next" onClick={() => { sortThumbs(currentBlgs.place + 1) }}>&#10095;</a>
      <div className="vid-carousel">
        {currentBlgs.blgs.map((blog, index, blgs) => (
          <BlogCarouselEntry blog={blog} index={index} blgs={blgs} />
        ))}
      </div>
    </div>
  );
}

export default BlogCarousel;
