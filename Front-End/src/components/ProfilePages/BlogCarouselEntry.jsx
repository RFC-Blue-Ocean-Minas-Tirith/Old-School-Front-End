/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react';

function BlogCarouselEntry({ blog }) {
  const [modal, setModal] = useState(false)
  return (
    <div className="blog-carousel-blog card center-block" onClick={() => { setModal(!modal)}}>
      <BlogModal show={modal} toggle={setModal.bind(this)} />
      <div className="card-body">
        <div className="card-title text-center">
          {blog.title}
        </div>
        <div className="card-text">
          {blog.description}
        </div>
      </div>
    </div>
  );
}

export default BlogCarouselEntry;
