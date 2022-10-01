import { useState, useEffect } from 'react';
import { Col, Row, Container, Button, Badge, ListGroup } from 'react-bootstrap';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo } from '@cloudinary/react';
import { pad } from '@cloudinary/url-gen/actions/resize';

function VideoPage() {
  // -----State-----
  const [video, setVideo] = useState({
    title: 'Fake Vid',
    description: 'This video is so silly and ridiculous you have no idea omg you should totally watch it it has cats.',
    username: 'Grumpycat',
    date_Uploaded: '10/1/2022',
    comments: [{
      id: 1,
      author: 'Alice',
      comment: 'Is that Jake from State Farm?!',
      date: '10/1/2022',
    },
    {
      id: 2,
      author: 'Adam',
      comment: 'Jealous of those beards...',
      date: '10/1/2022',
    },
    {
      id: 3,
      author: 'Vicki',
      comment: 'Look at these bros....',
      date: '10/1/2022',
    },
    {
      id: 4,
      author: 'Melissa',
      comment: 'Is the Colonel Mustard?',
      date: '10/1/2022',
    },
    {
      id: 5,
      author: 'Zach',
      comment: 'Where are they walking though...',
      date: '10/1/2022',
    }
    ],
    URL: 'http://www.google.com',
    votes: {
      insightful: {
        usernames: ['john', 'jacob', 'jimmerheimer'],
        count: 3,
      },
      funny: {
        usernames: ['john', 'jacob'],
        count: 2,
      },
      informative: {
        usernames: ['john'],
        count: 1,
      },
    },
    private: false,
  });
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'demo',
    },
  });

  // -----UseEffect-----
  useEffect(() => {

  })
  const myVideo = cld.video('docs/e_simulate_colorblind:tritanopia/walking_talking');
  myVideo.resize(pad().width(800));

  useEffect(() => {
    setVideo(video);
  }, [video]);

  return (
    <Container style={{ height: '100%' }}>
      <Row style={{ marginTop: '30px' }}>
        <Col>
          <div>
            <AdvancedVideo style={{ maxWidth: '100%' }} cldVid={myVideo} controls preload="true" />
          </div>
          <h2>{video.title}</h2>
          <p>{video.date}</p>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <h5><strong>{video.username}</strong></h5>
            <Badge pill bg="warning" text="dark">Favorite</Badge>
          </div>
          <p>{video.description}</p>
          <div>
            <Button variant="primary">
              Insightful
              <Badge bg="secondary">{video.votes.insightful.count}</Badge>
            </Button>
            <Button variant="primary">
              Informative
              <Badge bg="secondary">{video.votes.informative.count}</Badge>
            </Button>
            <Button variant="primary">
              Funny
              <Badge bg="secondary">{video.votes.funny.count}</Badge>
            </Button>
          </div>
        </Col>
        <Col>
          <ListGroup
            variant="flush"
            style={{
              overflowX: 'overflow',
              overflowY: 'scroll',
              maxHeight: '90%',
            }}
          >
            {video.comments.map((comment) => (
              <ListGroup.Item as="li" key={comment.id}>
                <h5>{comment.author}</h5>
                <h6>{comment.date}</h6>
                <p>{comment.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button style={{ width: '100%', height: '10%' }} bg="primary">Add Comment</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default VideoPage;
