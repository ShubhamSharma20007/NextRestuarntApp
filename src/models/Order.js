import mongoose from "mongoose";


const orderSchema =  new mongoose.Schema({
    email: { type: String, required: true,unique:true },
    order_data:{
        type:Array,
        

    }
},{timestamps:true})

const OrderModel =  mongoose.models.OrderModel || mongoose.model("OrderModel", orderSchema); // PizzaModel is the name of the model
export default OrderModel;