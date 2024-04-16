import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


import { Modal, Button } from 'react-bootstrap';
export default function Home() {
  const navigate = useNavigate();
const blogId = "66190bafb4e3aa04ae019281";

const [showModal, setShowModal] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault(); // Prevent the form from submitting
        setShowModal(true); // Show the thank you modal
    };

  return (
    <div>
      <div><Navbar /></div>
      <div>
        {/* <!-- section-1 top-banner --> */}
        <section id="home">
          <div className="container-fluid px-0 top-banner">
            <div className="container">
              <div className="row">
                <div className="col-lg-5 col-md-6">
                  <h1>Unlock your<br></br> best self,<br></br>one sync at a time.</h1>
                  <p>Are you ready to embark on a transformative path to a healthier, happier you? At HealthSync, we believe in the power of personalized wellness.We are not just a diet and supplement app; we are your partner in achieving your health and diet goals.
                  </p>
                  <div className="mt-4">
                    <button className="main-btn">Learn More <i className="fas fa-shopping-basket ps-3"></i></button>
                    {/* <button className="white-btn ms-lg-4 mt-lg-0 mt-4">Order now <i className="fas fa-angle-right ps-3"></i></button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- section-7 book-food--> */}
        <section id="book-food">
          <div className="book-food">
            <div className="container book-food-text">
              <div className="text-center">

                <h2>&ldquo;Our Mission: Empowering You to Thrive&ldquo;</h2>

                {/* <div className="col-lg-3 col-md-12 mt-lg-0 mt-4">
                  <button className="main-btn">Learn more</button>
                </div> */}
              </div>
            </div>
          </div>
        </section>


        {/* <!-- section-3 about--> */}
        <section id="about">
          <div className="about-section wrapper">
            {/* <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-7 col-md-12 mb-lg-0 mb-5">
                  <div className="card border-0">
                    <img decoding="async" src="images/img/img-1.png" className="img-fluid"/>
                  </div>
                </div>
                <div className="col-lg-5 col-md-12 text-sec">
                  <h2>We pride ourselves on making real food from the best ingredients.</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et purus a odio finibus bibendum in sit
                    amet leo. Mauris feugiat erat tellus.</p>
                  <button className="main-btn mt-4">Learn More</button>
                </div>
              </div>
            </div> */}
            <div className="container food-type">
              <div className="row align-items-center">
                <div className="col-lg-5 col-md-12 text-sec mb-lg-0 mb-2">
                  <h2>Your wellness<br></br>your way...</h2>
                  {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et purus a odio finibus bibendum in sit
                    amet leo. Mauris feugiat erat tellus.Far far away, behind the word mountains, far from the countries
                    Vokalia and Consonantia, there live the blind texts.</p> */}
                  <ul className="list-styled py-3">
                    <li><b>Personalized Nutrition:</b> Tailored diet plans based on your individual needs, whether youre looking to shed a few pounds, build muscle, or simply eat healthier.</li>
                    <li><b>Supplement Recommendations:</b> Discover the right supplements that complement your diet and enhance your health journey.</li>
                    <li><b>Fitness Classes On-Demand:</b> Choose from a variety of live fitness classes led by certified instructors, scheduled at convenient times to fit your busy life.</li>
                    <li><b>Sync Your Health:</b> Input your basic information like weight, height, age, health goals, fitness levels, dietary preferences, and medical conditions. We will take care of the rest.</li>
                  </ul>
                  {/* <div className="text-center">
                    <button className="main-btn mt-4 mx-auto">Learn More</button>
                  </div> */}

                </div>
                <div className="col-lg-6 col-md-8">
                  <div className="card border-0">
                    <img decoding="async" src="../src/assets/wowb.png" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- section-3 story--> */}
        <section id="story">
          <div className="story-section">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="text-content">
                    <h2>A balanced plate is a balanced life. Find the joy in moderation.</h2>
                    <p>Everyone's talking about the power of a balanced diet – are you falling behind? Discover how supplements can be your secret weapon.
</p>
                    <button
                      className="main-btn mt-3"
                      onClick={() => navigate(`/blogs/${blogId}`)} // Navigates to the blog page
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section id="book-food1">
          <div className="book-food1">
            <div className="container book-food-text">
              <div className="text-center">

                <h2 className="mb-4">Take the Health Test now! </h2>

                <Link className="white-btn ms-lg-4 mt-lg-0 mt-4 mt-lg-2" to="/bmi"> Get Started <i className="fas fa-angle-right"></i></Link>
              </div>
            </div>
          </div>
        </section>








        <section id="newslettar">
          <div className="newslettar wrapper">
            <div className="container">
              <div className="row">
                <div className="sol-sm-12">
                  <div className="text-content text-center pb-4">
                    <h2>Hurry up! Subscribe our newsletter
                      to get all the health news and tips.</h2>
                  </div>
                  <form className="newsletter" onSubmit={handleSubscribe}>
                    <div className="row">
                      <div className="col-md-8 col-12">
                        <input className="form-control" placeholder="Email Address here" name="email" type="email" />
                      </div>
                      <div className="col-md-4 col-12">
                      <button className="main-btn" type="submit">Subscribe</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thank You!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Thank you for subscribing!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>



      </div>
      <div><Footer /></div>
    </div>
  )
}
