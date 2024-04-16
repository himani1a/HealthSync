// Food.model.js
import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  Food: String,
  Serving: String,
  Calories: String
}, { collection: 'calorie' }); // Explicitly specifying the collection name

const Food = mongoose.model('Food', foodSchema);

export default Food;
