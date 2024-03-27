import mongoose from 'mongoose';

const MealSchema = new mongoose.Schema({
    dish: { type: String, required: true },
    calories: { type: Number, required: true },
    ingredients: { type: String, required: true }
}, { _id: false });

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
    bmi: { type: Number }, 
    calories: { type: String }, 
    recommendations: { 
        type: RecommendationDetailsSchema, 
        required: true 
    }
});

export default mongoose.model("Recommendation", RecommendationSchema);
