import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faPinterestP, faYoutube } from '@fortawesome/free-brands-svg-icons';
import '../style/Footer.css';

const Footer = () => {
  return (
    <Container fluid className=" footer text-light text-secondary">
      {/* Top section for logo */}
      {/* <Container className=' bg-light text-light text-center'>
    
       
        <Col xs={12} md={4} lg={3} className="mb-3 mb-md-0">
          <img src="../src/assets/healthsync.png" alt="Logo" height="50" className="logo" />
        </Col>

      </Container> */}
   
      <Row className="justify-content-between pt-3 pb-3">
        {/* Left Side: Links */}
        <Col xs={12} sm={6} lg={3} className="mb-3 mb-lg-0">
          <ul className="list-unstyled">
          <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Blog</Link>
                            </li>
            {/* Add additional links as needed */}
          </ul>
        </Col>

        {/* Center: Social Icons */}
        <Col xs={12} sm={6} lg={3} className="mb-3 mb-lg-0 text-center">
          <a href="https://facebook.com" className="text-light mx-2">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://instagram.com" className="text-light mx-2">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://twitter.com" className="text-light mx-2">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://pinterest.com" className="text-light mx-2">
            <FontAwesomeIcon icon={faPinterestP} />
          </a>
          <a href="https://youtube.com" className="text-light mx-2">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </Col>
        {/* Right Side: Newsletter Subscription */}
        <Col xs={12} lg={6} className="align-self-center">
          <Form className="text-center text-lg-right">
            <Form.Group controlId="newsletterEmail" className="d-inline-block">
              <Form.Label className='text-light'>Get the freshest Health news</Form.Label>
              <Form.Control
                type="email"
                placeholder="Your email here"
                className="mx-2"
                style={{ width: 'auto', display: 'inline-block' }}
              />
              <Form.Check
                type="checkbox"
                label="By checking the box, you agree that you are at least 16 years of age."
                className="mt-2"
              />
            </Form.Group>
            <Button className="footer-subscribe-btn" type="submit">Subscribe</Button>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center pt-3 pb-3 border-top">
        <Col xs={12} className="text-center">
          <small>
            Website Terms | Privacy Policy |  © 2024 Healthsync | All rights reserved| Do Not Sell My Information
          </small>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;