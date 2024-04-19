import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form, ListGroup } from 'react-bootstrap';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const result = await axios(`/api/comments/${postId}`);
                setComments(result.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [postId]);

    const handlePostComment = async () => {
        try {
            const result = await axios.post('/api/comments', { content: commentText, postId, author: 'Guest' });
            setComments([...comments, result.data]);
            setCommentText('');
        } catch (error) {
            console.error('Failed to post comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`/api/comments/${commentId}`);
            setComments(comments.filter(comment => comment._id !== commentId));
        } catch (error) {
            console.error('Failed to delete comment:', error);
        }
    };

    return (
        <Card className='no-hover-effect'>
            <Card.Body>
                <Card.Title>Comments</Card.Title>
                <ListGroup variant="flush">
                    {comments.map((comment) => (
                        <ListGroup.Item key={comment._id} className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{comment.author}</div>
                                {comment.content}
                            </div>
                            <Button variant="outline-danger" size="sm" onClick={() => handleDeleteComment(comment._id)}>Delete</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <Form>
                    <Form.Group className="mb-3" controlId="commentText">
                        <Form.Label>Add a comment</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handlePostComment}>Post Comment</Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default Comments;
