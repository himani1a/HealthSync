import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar1 from './Navbar';
import blogimage from '../assets/detail2.webp';
import { Card, Container, Row, Col } from 'react-bootstrap';
import '../style/DietForm.css';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const result = await axios('/api/blogs');
            setBlogs(result.data);
        };
        fetchBlogs();
    }, []);

    return (
        <div>
            <Navbar1 />
            <Container className="mt-3">
                {/* Blog Cards Display */}
                <Row className="mt-4">
                    {blogs.map(blog => (
                        <Col key={blog._id} sm={12} md={6} lg={4} className="mb-3">
                            <Card className="h-100">
                                <Card.Img variant="top" src={blog.image || blogimage} className="img-fluid" style={{ maxHeight: '190px'}} />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="big-text">{blog.title}</Card.Title>
                                    <Card.Text className="small-text">
                                        {blog.content.substring(0, 100)}...
                                    </Card.Text>
                                    <a
                                        href={`/blogs/${blog._id}`}
                                        className="text-decoration-underline mb-2"
                                        style={{ fontSize: '14px' }}
                                    >
                                        Read More
                                    </a>
                                    <p className="text-muted small mb-2">Author: {blog.author}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Blog;
