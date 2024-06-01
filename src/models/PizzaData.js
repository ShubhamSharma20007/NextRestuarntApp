import mongoose from "mongoose";


const pizzaSchema =  new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Object, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
    foodType:{type:String,required:true}
},{timestamps:true})

const PizzaModel =  mongoose.models.PizzaModel || mongoose.model("PizzaModel", pizzaSchema); // PizzaModel is the name of the model
export default PizzaModel;