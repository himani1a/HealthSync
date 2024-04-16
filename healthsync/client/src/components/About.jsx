import React from 'react';
import '../style/About.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const About = () => {
    return (
        <div>
            <div>
                <Navbar />

                <div className="responsive-container-block bigContainer">
                    <div className="responsive-container-block Container">
                        <div className="imgContainer">
                            <img className="blueDots" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/aw3.svg" alt="Decorative Dots" />
                            <img className="mainImg" src="../src/assets/about1.png" alt="Main Visual" />
                        </div>
                        <div className="responsive-container-block textSide">
                            <p className="text-blk heading">About Us</p>
                            <p className="text-blk subHeading">At HealthSync, we believe that everyone's path to better nutrition is unique. That's why we offer personalized diet recommendations and expert advice on nutritional supplements. <br />
                                Our goal is to empower you with the knowledge and tools you need to reach your health goals. Chat with our nutrition experts, explore our informative blog, and experience the difference a tailored approach can make. To complement your diet plan, we also provide nutritional supplement advice.<br/><br/>
                                Additionally, our platform includes a blog filled with informative content on nutrition, health tips, and the latest research in diet and wellness. This resource is designed to educate and inspire you to make informed choices about your health. 
                            </p>
                            <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                                <div className="cardImgContainer">
                                    <img className="cardImg" src="../src/assets/1.png" alt="Value Icon" />
                                </div>
                                <div className="cardText">
                                    <p className="text-blk cardSubHeading">Diet Recommendation</p>
                                </div>
                            </div>
                            <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                                <div className="cardImgContainer">
                                    <img className="cardImg" src="../src/assets/supplement.png" alt="Value Icon" />
                                </div>
                                <div className="cardText">
                                    <p className="text-blk cardSubHeading">Supplement information</p>
                                </div>
                            </div>
                            <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                                <div className="cardImgContainer">
                                    <img className="cardImg" src="../src/assets/avatar.jpg" alt="Value Icon" />
                                </div>
                                <div className="cardText">
                                    <p className="text-blk cardSubHeading">Live chat support</p>
                                </div>
                            </div>
                            <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                                <div className="cardImgContainer">
                                    <img className="cardImg" src="../src/assets/blog.png" alt="Value Icon" />
                                </div>
                                <div className="cardText">
                                    <p className="text-blk cardSubHeading">Educational Blogs</p>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <div><Footer /></div>
        </div>
    );
};

export default About;
