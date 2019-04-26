import React, { Component } from 'react';
import { UncontrolledCarousel, Button } from 'reactstrap';
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
    console.log('Landing Render props', this.props);

    return (
      <div className="landingContainer">
        <UncontrolledCarousel
          controls={false}
          indicators={false}
          items={items}
        />

        <div className="sectionWrapper">
          <h2>Who We Are</h2>
          <section className="topSection">
            <div className="leftSection">
              <p>
                With thousands of adult learners around the world, Reminders
                International introduces convinience and dedication to business
                training and mentorship. This App allows messages and reminders
                to be scheduled and sent to any device via SMS or WhatsApp which
                notifies clients of important information between training
                sessions. Its scheduling feature allows messages to be scheduled
                and sent at a later date reminding clients of assignments and
                class schedules as well as eliminates travel barriers.
              </p>
              <Button color="primary" onClick={this.props.auth.login}>
                Explore
              </Button>
            </div>
            <div className="rightSection">
              <img
                src="./images/globalization.png"
                alt="Connecting the Worls"
              />{' '}
            </div>
          </section>
        </div>

        <section className="aboutUs">
          <h2>What We Do</h2>
          <div className="focusWrapper">
            <div className="focus">
              <img src="./images/mentorship.jpg" alt="Mentorship" />
              <h3>Mentorship</h3>
              <p>
                Whether you are exploring the idea of starting a business in
                your area or you are currently participating in one, Reminders
                International will hand you the resources to take your business
                to the next level. Our Dedicated mentors are available
                throughout your enrolment and after.
              </p>
            </div>
            <div className="focus">
              <img src="./images/elearning.png" alt="eLearning" />
              <h3>e-Learning</h3>
              <p>
                As technology advances, so does the need for the advancement of
                traditional learning. At Reminders International, we pride
                ourselves with industry leading technologies to bring motivation
                into learning. By utilizing electronic technologies we are able
                to impact even more learners around the world.
              </p>
            </div>
            <div className="focus">
              <img src="./images/calendar.jpg" alt="Calendar" />
              <h3>Organize</h3>
              <p>
                We know multitasking life and learning is a tough task to deal
                with that is why Reminders International is structured to keep
                you in the loop on matters that are important to your learning
                so you never miss a deadline or worry about missing a class.
              </p>
            </div>
          </div>
        </section>

        <section className="quoteSlider">
          <UncontrolledCarousel
            controls={false}
            indicators={true}
            items={quotes}
          />
        </section>

        <div className="missionWrapper">
          <h2>Our Mission</h2>
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
        </div>

        <section className="ourTeamWrapper">
          <h2>Developers</h2>
          <span className="ourTeam">
            <div className="team">
              <img src="./images/katie.png" alt="Katie Fitzpatrick" />
              <h5>Katie Fitzpatrick</h5>
              <h6>Web Developer</h6>
            </div>
            <div className="team">
              <img src="./images/elisha.jpg" alt="Elisha Atulomah" />
              <h5>Elisha Atulomah</h5>
              <h6>Web Developer</h6>
            </div>
            <div className="team">
              <img src="./images/kat.jpg" alt="Kat Johnson-Fries" />
              <h5>Kat Johnson-Fries</h5>
              <h6>Web Developer</h6>
            </div>
            <div className="team">
              <img src="./images/rachel.jpg" alt="Rachel Kolk" />
              <h5>Rachel Kolk</h5>
              <h6>Web Developer</h6>
            </div>
            <div className="team">
              <img src="./images/james.png" alt="James McRae" />
              <h5>James McRae</h5>
              <h6>Project Manager</h6>
            </div>
          </span>
        </section>

        <section className="footer">
          <div className="footerSocial">
            <a href="https://www.facebook.com" target="_blank">
              <i className="fab fa-facebook-square fa-3x" />{' '}
            </a>
            <a href="https://www.linkedin.com" target="_blank">
              <i href="#" className="fab fa-linkedin  fa-3x" />
            </a>
            <a href="https://www.twitter.com" target="_blank">
              <i href="#" className="fab fa-twitter-square fa-3x" />
            </a>
          </div>
          <p>&copy; 2019 Reminders International - All Rights Reserved</p>
        </section>
      </div>
    );
  }
}

export default LandingPage;
