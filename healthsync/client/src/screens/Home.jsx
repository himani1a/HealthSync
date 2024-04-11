import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from "react-router-dom";


export default function Home() {
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
                    <h2>When your plate is mindful, richness lies in balance, not in indulgence. </h2>
                    <p>In hyperthyroidism, beware: what you avoid on your plate can
                       be as vital as what you consume. Guard your health with conscious choices.</p>
                    <button className="main-btn mt-3">Read More</button>
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
        
   

        {/* <!-- section-4 explore food-->
        <section id="explore-food">
          <div className="explore-food wrapper">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="text-content text-center">
                    <h2>Explore Our Foods</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et purus a odio finibus bibendum in sit
                      amet leo. Mauris feugiat erat tellus. Far far away, behind the word mountains, far from the countries
                      Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.</p>
                  </div>
                </div>
              </div>
              <div className="row pt-5">
                <div className="col-lg-4 col-md-6 mb-lg-0 mb-5">
                  <div className="card">
                    <img decoding="async" src="images/img/img-3.jpg" className="img-fluid" />
                    <div className="pt-3">
                      <h4>Rainbow Vegetable Sandwich</h4>
                      <p>Time: 15 - 20 Minutes | Serves: 1</p>
                      <span>$10.50 <del>$11.70</del></span>
                      <button className="mt-4 main-btn">Order Now</button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-lg-0 mb-5">
                  <div className="card">
                    <img decoding="async" src="images/img/img-4.jpg" className="img-fluid" />
                    <div className="pt-3">
                      <h4>Vegetarian Burger</h4>
                      <p>Time: 30 - 45 Minutes | Serves: 1</p>
                      <span>$9.20<del>$10.50</del></span>
                      <button className="mt-4 main-btn">Order Now</button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-lg-0 mb-5">
                  <div className="card">
                    <img decoding="async" src="images/img/img-5.jpg" className="img-fluid" />
                    <div className="pt-3">
                      <h4>Raspberry Stuffed French Toast</h4>
                      <p>Time: 10 - 15 Minutes | Serves: 1</p>
                      <span>$12.50<del>$13.20</del></span>
                      <button className="mt-4 main-btn">Order Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

       {/* <!-- Section-5 testimonial--> 
        <section id="testimonial">
          <div className="wrapper testimonial-section">
            <div className="container text-center">
              <div className="text-center pb-4">
                <h2>Testimonial</h2>
              </div>
              <div className="row">
                <div className="col-sm-12 col-lg-10 offset-lg-1">
                  <div id="carouselExampleDark" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active"
                        aria-current="true" aria-label="Slide 1"></button>
                      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <div className="carousel-caption">
                          <img decoding="async" src="images/review/review-1.jpg" />
                          <p>"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there
                            live the blind texts. "</p>
                          <h5>Johnthan Doe - UX Designer</h5>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="carousel-caption">
                          <img decoding="async" src="images/review/review-2.jpg" />
                          <p>"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there
                            live the blind texts. "</p>
                          <h5>Maccy Doe - Front End</h5>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="carousel-caption">
                          <img decoding="async" src="images/review/review-1.jpg" />
                          <p>"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there
                            live the blind texts. "</p>
                          <h5>Johnthan Doe - UX Designer</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* <!-- section-6 faq--> 
        <section id="faq">
          <div className="faq wrapper">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="text-center pb-4">
                    <h2>Frequently Asked Questions</h2>
                  </div>
                </div>
              </div>
              <div className="row pt-5">
                <div className="col-sm-6 mb-4">
                  <h4><span>~</span>Is Foodies Bread really baked fresh each day?</h4>
                  <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the
                    blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language.
                  </p>
                </div>
                <div className="col-sm-6 mb-4">
                  <h4><span>~</span>Do you bake breads containing animal fats or products?</h4>
                  <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the
                    blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language.
                  </p>
                </div>
                <div className="col-sm-6 mb-4">
                  <h4><span>~</span>Can I order your products online?</h4>
                  <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the
                    blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language.
                  </p>
                </div>
                <div className="col-sm-6 mb-4">
                  <h4><span>~</span>When are you opening a shop near me?</h4>
                  <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the
                    blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section> */}


       
        <section id="newslettar">
          <div className="newslettar wrapper">
            <div className="container">
              <div className="row">
                <div className="sol-sm-12">
                  <div className="text-content text-center pb-4">
                    <h2>Hurry up! Subscribe our newsletter
                      to get all the health news and tips.</h2>
                  </div>
                  <form className="newsletter">
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




      </div>
      <div><Footer /></div>
    </div>
  )
}
