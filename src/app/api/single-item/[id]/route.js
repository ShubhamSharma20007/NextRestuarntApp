import { connectDb } from "@/utils/DB"
import PizzaModel from "@/models/PizzaData"
import { NextResponse } from "next/server"
 connectDb()
export async function GET(req,{params}){
    try {
        
        const {id} = params 
        const findItem =  await PizzaModel.findById(id)
        if(findItem){
            return NextResponse.json(findItem,{status:200})
        }
    } catch (error) {
        return NextResponse.json(error,{status:500})    
    }
}