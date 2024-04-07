import express from 'express';
import adminController from '../controller/admin-controller.js';

const router = express.Router();

// Use the imported adminController object to access methods
router.route('/users').get(adminController.getAllusers);
router.route('/users/delete/:id').delete(adminController.deleteUserById);
// Add a PUT route for updating users
router.route('/users/update/:id').put(adminController.updateUserById);
router.get('/user-count', adminController.getUserCount);

export default router;
