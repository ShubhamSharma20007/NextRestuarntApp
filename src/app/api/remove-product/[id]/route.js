import PizzaModel from "@/models/PizzaData";
import { NextResponse } from "next/server";
import { connectDb } from "@/utils/DB";
 connectDb()
export async function DELETE(request,{params}){
    
    const {id} = params
    try {
        const res = await PizzaModel.findByIdAndDelete(id);
        if(res){
            return NextResponse.json({message:"Product Deleted",success:true})
        }
    } catch (error) {
        return NextResponse.json({message:"Product Not Deleted",success:false})
    }
}