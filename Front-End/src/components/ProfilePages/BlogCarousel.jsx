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
    sortThumbs(0);
  }, [blogs]);

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
      <div className="container-fluid">
        <h2 className="text-center"> Blog Posts </h2>
        <div className="row justify-content-between">
          <div className="col-2"></div>
          <div className="col-2">
            <button type="button" className="btn btn-primary me-2" onClick={() => { sortThumbs(currentBlgs.place + 1) }}>More Blogs</button>
          </div>
        </div>
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
      <div className="container-fluid">
        <h2 className="text-center"> Blog Posts </h2>
        <div className="row justify-content-between">
          <div className="col-2">
            <button type="button" className="btn btn-primary me-2" onClick={() => { sortThumbs(currentBlgs.place - 1) }}>Prev Blogs</button>
          </div>
          <div className="col"></div>
        </div>
        <div className="vid-carousel">
          {currentBlgs.blgs.map((blog, index, blgs) => (
            <BlogCarouselEntry blog={blog} index={index} blgs={blgs} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="container-fluid">
      <h2 className="text-center"> Blog Posts </h2>
      <div className="row justify-content-between">
        <div className="col-2">
          <button type="button" className="btn btn-primary me-2" onClick={() => { sortThumbs(currentBlgs.place - 1) }}>Prev Blogs</button>
        </div>
        <div className="col-2">
          <button type="button" className="btn btn-primary me-2" onClick={() => { sortThumbs(currentBlgs.place + 1) }}>More Blogs</button>
        </div>
      </div>
      <div className="vid-carousel">
        {currentBlgs.blgs.map((blog, index, blgs) => (
          <BlogCarouselEntry blog={blog} index={index} blgs={blgs} />
        ))}
      </div>
    </div>
  );
}

export default BlogCarousel;
