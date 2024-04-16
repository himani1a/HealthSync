import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col, Image } from 'react-bootstrap';

import PlaceholderImage from '../assets/detail1.webp'; // Import a placeholder or related image

const BlogDetail = () => {
    const [blog, setBlog] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const result = await axios(`/api/blogs/${id}`);
                setBlog(result.data);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };

        fetchBlog();
    }, [id]);

    if (!blog) {
        return <div className="text-center"><h2>Loading...</h2></div>;
    }

    const titleStyle = {
        color: '#495E57',
        fontWeight: 'bold',
        fontSize: '2rem'
    };

    const contentStyle = {
        fontSize: '1.1rem',
        whiteSpace: 'pre-wrap' // Add this to preserve whitespaces and line breaks
    };

    // Function to convert text content to HTML paragraphs
    const renderParagraphs = text => {
        return text.split('\n').map((paragraph, idx) => (
            <p key={idx} style={{ textAlign: 'justify', textIndent: '2em', lineHeight: '1.6' }}>
                {paragraph}
            </p>
        ));
    };

    return (
        <Container className="my-5">
            <Card className="shadow-sm bg-white">
                <Card.Body>
                    <Row>
                        <Col md={8}>
                            <Card.Title style={titleStyle}>{blog.title}</Card.Title>
                            <Card.Text style={contentStyle}>
                                <small>Written by <strong>{blog.author}</strong></small>
                                {renderParagraphs(blog.content)}
                            </Card.Text>
                        </Col>
                        <Col md={4} className="d-flex align-items-center justify-content-center">
                            <Image src={PlaceholderImage} className="img-fluid" alt="Blog Image" />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default BlogDetail;
