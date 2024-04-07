import User from '../model/User.model.js';

const getAllusers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        console.log(users);
        if (!users) {
            return res.status(404).json({ error: 'No users found' });
        }
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

// Define the updateUserById method
const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

const getUserCount = async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.json({ count, timestamp: new Date() });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Error fetching user count' });
    }
}; 
// ES Module export syntax
export default { getAllusers, deleteUserById, updateUserById, getUserCount  };
