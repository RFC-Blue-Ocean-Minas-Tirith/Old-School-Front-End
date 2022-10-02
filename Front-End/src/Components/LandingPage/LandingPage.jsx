import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

//TODO:  Add an alt description for each img

const LandingPage = () => {

  // =========== Local Data ===============

  const time = ['2022-09-23T03:23:34.234', '2022-07-15T04:16', '2018-05-18T07:16', '2021-01-09T12:16', '2021-11-16T08:55']
  const videoDescription = ['Our friend, and resident The Office US expert, Jason Kessler is back to answer your questions about his time working on the show!',
    'Pops goes to stay with Bev and the family after he is evicted from his apartment.',
    'Morty loses his wallet, or has it stolen, while visiting a back specialist in New York.',
    'With a career lasting over 50 years, Jerry Stiller was a staple of comedy, both on stage and screen. Half of comedy duo with his wife Anne Meara, Stiller & Meara, the pair made frequent appearances on late night shows and TV specials starting in the 60\'s. Most likely his most notable performance was of Frank Costanza on the hit show Seinfeld. A small tribute showcasing why he made the character so iconic.'
  ]
  const creatorName = ['Creed', 'Pops', 'Morty', 'Frank']
  const videoTitles = ['How Creed Thoughts Was Written', 'The Goldbergs | Pops Moves In', 'Seinfeld Clip - My Wallet\'s Gone', 'Jerry Stiller as Frank Costanza Tribute']
  const thumbnails = ['https://res.cloudinary.com/dwl50vubn/image/upload/v1664643111/Screen_Shot_2022-10-01_at_11.50.47_AM_ztuwta.png', 'https://res.cloudinary.com/dwl50vubn/image/upload/v1664643214/Screen_Shot_2022-10-01_at_11.53.08_AM_i62erk.png', 'https://res.cloudinary.com/dwl50vubn/image/upload/v1664643379/Screen_Shot_2022-10-01_at_11.55.49_AM_pezhch.png', 'https://res.cloudinary.com/dwl50vubn/image/upload/v1664643470/Screen_Shot_2022-10-01_at_11.57.25_AM_kuwii9.png'];

  // =========== End Local Data ============

  const [index, setIndex] = useState(0);

  useEffect(() => {
    console.log(index);
  }, [index]);

  return (
    <div class="border border-primary ">
      <Container class="w-auto p-11 ">
        <Row >
          <Col class="border border-success">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Sorting Options
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Informative</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Insightful</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Funny</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            <Row>
              <Col>
                <h1>{videoTitles[index]}</h1>
              </Col>

            </Row>
            <Row>
              <Col><div class="border board-primary">{timeAgo.format(new Date(time[index]).getTime(),'round-minute')}</div> </Col>
              <Col><Button variant="primary">Favorite</Button>{' '}</Col>
            </Row>
            <h5 class="border border-warning">{creatorName[index]}</h5>
            <h5 class="border border-dark">{videoDescription[index]}</h5>
            {/* <div style={{ height: 300 }}> */}
              <Row>
                <Col class="border border-primary"> <Button variant="primary">Insightful</Button></Col>
                <Col> <Button variant="primary">Funny</Button></Col>
                <Col> <Button variant="primary">Informative</Button></Col>
              </Row>
            {/* </div> */}
          </Col>

          <Col class="border border-success" md={8}>
            <Carousel interval={null} onSlide={setIndex}>
              {
                thumbnails.map((thumbnail, i) => {
                  return (<Carousel.Item key={i}>
                    <img className="d-block w-100" src={thumbnail} />
                  </Carousel.Item>)
                })
              }
            </Carousel>
          </Col>
        </Row>

      </Container>
    </div>
  )
}

export default LandingPage;