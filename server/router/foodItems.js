// In your foodItems.js router file
import express from 'express';
import Food from '../model/Food.model.js'; // Assuming you have a Food model set up similar to this

const router = express.Router();

// Get calorie data for a given food name
router.get('/:foodName', async (req, res) => {
  try {
    const foodName = req.params.foodName;
    // Adjust the field name to 'Food' and remove exact match requirement
    const query = { Food: new RegExp(foodName, 'i') };
    console.log(`Query:`, query);
    const foodItem = await Food.findOne(query);
    console.log(`Food Item:`, foodItem);
    if (foodItem) {
      res.json(foodItem);
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (error) {
    console.error(`Error during food lookup: ${error.message}`);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


export default router;
