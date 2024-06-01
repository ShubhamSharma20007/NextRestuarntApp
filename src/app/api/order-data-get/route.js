
import { connectDb } from "@/utils/DB";
import { NextResponse } from "next/server";
import OrderModel from "@/models/Order";
 connectDb()
export async function POST(request){
    try {
       
        const {email} = await request.json()
        const  userOrderData = await OrderModel.find({email})
        
        return NextResponse.json({data:userOrderData,success:true},{status:200})
    } catch (error) {
            return NextResponse.json({message:error.message,success:false},{status:500})
    }
}