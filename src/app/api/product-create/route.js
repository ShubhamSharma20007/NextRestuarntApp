import { NextResponse } from "next/server";
import {connectDb} from "@/utils/DB"
import PizzaModel from "@/models/PizzaData";
 connectDb()
export async function POST(request){
    
    const data = await request.json()
    const existing  = await PizzaModel.findOne({name:data.name})
    if(existing){
        return NextResponse.json({message:"pizza already exists"},{status:400})
    }
    // for (let i = 0; i < data.length; i++) {
        await PizzaModel.create(data)
    // }
    return NextResponse.json({name:"done"})
}


export async function GET(request){
    await connectDb()
    const data = await PizzaModel.find()
    return NextResponse.json({data},{status:200})
}