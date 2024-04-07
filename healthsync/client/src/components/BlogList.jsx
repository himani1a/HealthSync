import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'
import blogimage from '../assets/detail2.webp';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Form, Card, Container, Row, Col } from 'react-bootstrap';
import '../style/DietForm.css'; // Ass
const BlogList = () => {

    const imageSrc = blogimage;

    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentBlog, setCurrentBlog] = useState(null);
    const [newBlogData, setNewBlogData] = useState({ title: '', content: '', author: '', image: '' });

    useEffect(() => {
        const fetchBlogs = async () => {
            const result = await axios('/api/blogs');
            setBlogs(result.data);
        };
        fetchBlogs();
    }, []);

    const handleDelete = async (blogId) => {
        try {
            await axios.delete(`/api/blogs/${blogId}`);
            setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };
    const handleEdit = async (blogId) => {
        try {
            const result = await axios.put(`/api/blogs/${blogId}`, currentBlog);
            const updatedBlog = result.data;
            setBlogs(prevBlogs =>
                prevBlogs.map(blog => (blog._id === updatedBlog._id ? updatedBlog : blog))
            );
            setShowEditForm(false); // Close the edit form modal
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('/api/blogs', newBlogData);
            const createdBlog = result.data;
            setBlogs(prevBlogs => [...prevBlogs, createdBlog]);
            setNewBlogData({ title: '', content: '', author: '' });
            toggleCreateForm();
            navigate(`/blogs/${createdBlog._id}`);
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (showEditForm) {
            setCurrentBlog({ ...currentBlog, [name]: value });
        } else {
            setNewBlogData({ ...newBlogData, [name]: value });
        }
    };

    const openEditForm = (blog) => {
        setCurrentBlog(blog);
        setShowEditForm(true);
    };

    const toggleCreateForm = () => {
        setShowCreateForm(!showCreateForm);
    };
    return (
        <div>
            <div><Navbar /></div>

            <Container className="mt-3">
                <Button variant="primary" onClick={toggleCreateForm}>
                    Create Blog
                </Button>
                <Modal show={showCreateForm} onHide={() => setShowCreateForm(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Blog</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleCreate}>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label >Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter title"
                                    name="title"
                                    value={newBlogData.title}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Content</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter content"
                                    name="content"
                                    value={newBlogData.content}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Author</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter author's name"
                                    name="author"
                                    value={newBlogData.author}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowCreateForm(false)}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Create
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>


                <Modal show={showEditForm} onHide={() => setShowEditForm(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Blog</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        handleEdit(currentBlog._id);
                    }}>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter title"
                                    name="title"
                                    value={currentBlog?.title || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Content</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter content"
                                    name="content"
                                    value={currentBlog?.content || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Author</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter author's name"
                                    name="author"
                                    value={currentBlog?.author || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowEditForm(false)}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                {/* Blog Cards Display */}
                <Row className="mt-4">
  {blogs.map(blog => (
    <Col key={blog._id} sm={12} md={6} lg={4} className="mb-3">
      <Card className="h-100">
        <Card.Img variant="top" src={blogimage} className="img-fluid" style={{ maxHeight: '190px'}} />
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
          <div className="d-flex justify-content-end mt-auto">
            
            <Button variant="outline-primary" onClick={() => openEditForm(blog)} size="sm" className="me-1">
              Edit
            </Button>
            <Button variant="outline-danger" onClick={() => handleDelete(blog._id)} size="sm" className="ms-1">
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>


            </Container>
        </div>
    );
};

export default BlogList;