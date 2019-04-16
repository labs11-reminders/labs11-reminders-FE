import React, { Component } from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import './LandingPage.css';

const items = [
  {
    src: './images/Carousel-2.jpg',
    altText: 'Empowering agriculture',
  },
  {
    src: './images/Carousel-3.jpg',
    altText: 'Technology Training',
  },
  {
    src: './images/Carousel-4.jpg',
    altText: 'Leadership',
  },
  {
    src: './images/Carousel-1.jpg',
    altText: 'Empowerment',
  },
  {
    src: './images/Carousel-5.jpg',
    altText: 'Mentorship',
  },
  {
    src: './images/Carousel-7.jpg',
    altText: 'Business Training',
  },
];

const quotes = [
  {
    src: './images/quote-1.png',
  },
  {
    src: './images/quote-2.png',
  },
  {
    src: './images/quote-3.png',
  },
  {
    src: './images/quote-4.png',
  },
  {
    src: './images/quote-5.png',
  },
  {
    src: './images/quote-6.png',
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
        <h2>Who We Are</h2>
        <section className="topSection">
          <div className="leftSection">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Quibusdam minima iste omnis odit cum saepe obcaecati hic delectus
              deserunt rem? Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Tenetur in, optio id dolor, libero rerum inventore nam
              alias, voluptas beatae quod aliquam laudantium quaerat. Temporibus
              iure amet quidem ullam modi!
            </p>
          </div>
          <div className="rightSection">
            <img src="./images/globalization.png" alt="Connecting the Worls" />{' '}
          </div>
        </section>
        <h2>What We Do</h2>
        <section className="aboutUs">
          <div className="focus">
            <img src="./images/mentorship.jpg" alt="Mentorship" />
            <h3>Mentorship</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Asperiores iusto deserunt tempore pariatur aliquam aliquid est!
              Totam quia reprehenderit expedita?
            </p>
          </div>
          <div className="focus">
            <img src="./images/elearning.png" alt="eLearning" />
            <h3>e-Learning</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Asperiores iusto deserunt tempore pariatur aliquam aliquid est!
              Totam quia reprehenderit expedita?
            </p>
          </div>
          <div className="focus">
            <img src="./images/calendar.jpg" alt="Calendar" />
            <h3>Organize</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Asperiores iusto deserunt tempore pariatur aliquam aliquid est!
              Totam quia reprehenderit expedita?
            </p>
          </div>
        </section>
        <section className="quoteSlider">
          <UncontrolledCarousel
            controls={false}
            indicators={true}
            items={quotes}
          />
        </section>
        <h2>Our Mission is to... Lorem ipsum dolor sit amet.</h2>
        <section className="mission">
          <div className="ourMission">
            <img src="./images/access.png" alt="Impact" />
            <div className="overlay" />
            <div className="text">Access to Education</div>
          </div>
          <div className="ourMission">
            <img src="./images/empowerment.jpg" alt="Empowerment" />
            <div className="overlay" />
            <div className="text">Empowerment</div>
          </div>
          <div className="ourMission">
            <img src="./images/leaders.jpg" alt="Leadership Building" />
            <div className="overlay" />
            <div className="text">Leadership Building</div>
          </div>
        </section>
        <section className="footer">
          <div className="footerSocial">
            <a href="https://www.facebook.com" target="_blank">
              <i class="fab fa-facebook-square fa-3x" />{' '}
            </a>
            <a href="https://www.linkedin.com" target="_blank">
              <i href="#" class="fab fa-linkedin  fa-3x" />
            </a>
            <a href="https://www.twitter.com" target="_blank">
              <i href="#" class="fab fa-twitter-square fa-3x" />
            </a>
          </div>
          <p>&copy; Reminders International - All Rights Reserved</p>
        </section>
      </div>
    );
  }
}

export default LandingPage;
