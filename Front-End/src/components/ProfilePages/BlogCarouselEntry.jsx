/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react';
import Name from './../Modals/Blank';

function BlogCarouselEntry({ blog }) {
  const [modal, setModal] = useState(false)
  setModal.bind(this);
  return (
    <div className="blog-carousel-blog card center-block" onClick={() => { setModal(!modal)}}>
      <Name show={modal} toggle={setModal} />
      <div className="card-body" style={{ height: '250px', width: '250px' }}>
        <div className="card-title text-center">
          {blog.title}
        </div>
        <div className="card-text text-center">
          {blog.description}
        </div>
        <div className="card-text text-center">
          {blog.date}
        </div>
      </div>
    </div>
  );
}

export default BlogCarouselEntry;
