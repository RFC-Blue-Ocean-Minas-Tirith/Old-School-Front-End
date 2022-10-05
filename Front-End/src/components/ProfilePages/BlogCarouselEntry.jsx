/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react';
import Blog from './../Modals/Blog';
import TimeAgo from 'javascript-time-ago';
const timeAgo = new TimeAgo('en-US')

function BlogCarouselEntry({ blog, currentUser }) {
  const [modal, setModal] = useState(false)
  setModal.bind(this);
  return (
    <div className="blog-carousel-blog card center-block" style={{ cursor: 'pointer'}} onClick={() => { setModal(!modal)}}>
      <Blog show={modal} toggle={setModal} blog={blog} currentUser={currentUser}/>
      <div className="card-body" style={{ height: '250px', width: '250px' }}>
        <div className="card-title text-center">
          {blog.title}
        </div>
        <div className="card-text text-center">
          {`${blog.description.slice(0, 100)}...`}
        </div>
        <div className="card-text text-center">
          {timeAgo.format(new Date(blog.dateUploaded))}
        </div>
      </div>
    </div>
  );
}

export default BlogCarouselEntry;
