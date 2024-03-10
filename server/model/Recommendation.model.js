
import mongoose from 'mongoose';

const MealSchema = new mongoose.Schema({
    dish: { type: String, required: true },
    calories: { type: Number, required: true }, // Or String if calories is descriptive
    ingredients: { type: String, required: true } 
});

const RecommendationDetailsSchema = new mongoose.Schema({ 
    breakfast: [MealSchema], 
    lunch: [MealSchema], 
    dinner: [MealSchema] 
}, { _id: false }); 


const RecommendationSchema = new mongoose.Schema({
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    activity: { type: String, required: true },
    recommendations: {
        type: RecommendationDetailsSchema,
        required: true // If you expect recommendations to always be present
    }
});

export default mongoose.model("Recommendation", RecommendationSchema);
// const RecommendationDetailsSchema = new mongoose.Schema({
//     // calories: { type: String, required: true }, // Assuming calories might be a descriptive string like "2000-2500 calories per day"
//     breakfast: [{ type: String }], // Array of strings
//     lunch: [{ type: String }], // Array of strings
//     dinner: [{ type: String }] // Array of strings
// }, { _id: false }); // Prevents _id creation for subdocument

