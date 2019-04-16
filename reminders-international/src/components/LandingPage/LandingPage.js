import React, { Component } from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import './LandingPage.css';

const items = [
  {
    src: './images/Carousel-1.jpg',
  },
  {
    src: './images/Carousel-2.jpg',
  },
  {
    src: './images/Carousel-3.jpg',
  },
  {
    src: './images/Carousel-4.jpg',
  },
  {
    src: './images/Carousel-5.jpg',
  },
  {
    src: './images/Carousel-7.jpg',
  },
];

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="landingContainer">
        <h1>LANDING PAGE</h1>
        <UncontrolledCarousel
          controls={false}
          indicators={false}
          items={items}
        />
        <section className="topSection">
          <div className="leftSection">left</div>
          <div className="rightSection">right</div>
        </section>
        <section className="aboutUs">
          <div className="focus">
            <img src="" alt="" />
            <h3>Title</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Asperiores iusto deserunt tempore pariatur aliquam aliquid est!
              Totam quia reprehenderit expedita?
            </p>
          </div>
          <div className="focus">
            <img src="" alt="" />
            <h3>Title</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Asperiores iusto deserunt tempore pariatur aliquam aliquid est!
              Totam quia reprehenderit expedita?
            </p>
          </div>
          <div className="focus">
            <img src="" alt="" />
            <h3>Title</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Asperiores iusto deserunt tempore pariatur aliquam aliquid est!
              Totam quia reprehenderit expedita?
            </p>
          </div>
        </section>
        <section className="mission">
          <h3>Our Mission is to... Lorem ipsum dolor sit amet.</h3>
        </section>
        <section className="footer">
          <p>&copy; Reminders Internaltional - All Rights Reserved</p>
        </section>
      </div>
    );
  }
}

export default LandingPage;
