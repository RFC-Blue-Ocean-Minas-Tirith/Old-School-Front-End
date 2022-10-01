import { useState, useEffect } from 'react';
import { Col, Row, Container, Button, Badge, ListGroup } from 'react-bootstrap';

function VideoPage() {
  const [video, setVideo] = useState({
    title: 'Fake Vid',
    description: 'This video is so silly and ridiculous you have no idea omg you should totally watch it it has cats.',
    username: 'Grumpycat',
    date_Uploaded: '10/1/2022',
    comments: [{
      id: 1,
      author: 'Alice',
      comment: 'Pretty dope brah, that cat is siiiiiick!',
      date: '10/1/2022',
    },
    {
      id: 2,
      author: 'Adam',
      comment: 'Would be cooler if it was a dog',
      data: '10/1/2022',
    },
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

  useEffect(() => {
    setVideo(video);
  }, [video]);

  return (
    <Container>
      <Row>
        <Col>
          <div>Placeholder for Video Player</div>
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
          <ListGroup>
            {video.comments.map((comment) => (
              <ListGroup.Item as="li" key={comment.id}>
                <h5>{comment.author}</h5>
                <p>{comment.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button bg="primary">Add Comment</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default VideoPage;
