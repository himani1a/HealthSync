import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Swal from 'sweetalert2'; // Import SweetAlert2
import Navbar1 from '../components/Navbar1'
import Footer from '../components/Footer'

import { Card, Row, Col, Container } from 'react-bootstrap'; // Import necessary Bootstrap components
import { FaRunning, FaSeedling, FaUsers } from 'react-icons/fa'; // Import icons for visual appeal

function Video() {
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    const handleJoinRoom = useCallback(() => {
        
      Swal.fire({
          title: 'Payment Required',
          text: 'You need to pay first to continue.',
          icon: 'warning',
          confirmButtonText: 'Go to Payment',
          cancelButtonText: 'Cancel',
          showCancelButton: true,
      }).then((result) => {
          if (result.isConfirmed) {
              navigate('/PaymentPage');
          }
      });
    }, [navigate]);

    return (
        <div>
            <Navbar1 />
            <Container style={{ backgroundColor: '#495E57', color: '#FFFFFF' }} className="py-5 mb-3">
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6} lg={4}>
                        <div className="input-group mb-3">
                            <input
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                type="text"
                                id="room-input"
                                className="form-control"
                                placeholder="Enter Room ID"
                                aria-label="Room ID"
                            />
                            <button
                                className="btn btn-warning"
                                type="button"
                                onClick={handleJoinRoom}
                            >
                                Join Room
                            </button>
                        </div>
                    </Col>
                </Row>
                {/* Enhanced Cards Section */}
                <Row className="mt-4 g-4">
                    <Col md={4}>
                        <Card className="bg-light text-light">
                            <Card.Img variant="top" src="https://source.unsplash.com/1600x900/?exercise" />
                            <Card.Body>
                                <Card.Title><FaRunning /> Benefits of Exercise</Card.Title>
                                <Card.Text>
                                    Exercise can increase life expectancy, reduce risk of diseases, and enhance mental health. Dive into a daily routine to transform your life.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="bg-light text-light">
                            <Card.Img variant="top" src="https://source.unsplash.com/1600x900/?yoga" />
                            <Card.Body>
                                <Card.Title><FaSeedling /> Yoga for Mindfulness</Card.Title>
                                <Card.Text>
                                    Embrace yoga to enhance flexibility, reduce stress, and improve your overall mental clarity. Join our sessions to discover inner peace.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="bg-light text-light">
                            <Card.Img variant="top" src="https://source.unsplash.com/1600x900/?community" />
                            <Card.Body>
                                <Card.Title><FaUsers /> Our Fitness Community</Card.Title>
                                <Card.Text>
                                    Connect with like-minded individuals to motivate and inspire each other. Our community makes fitness fun and engaging.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <div><Footer /></div>

        </div>
    );
}

export default Video;
