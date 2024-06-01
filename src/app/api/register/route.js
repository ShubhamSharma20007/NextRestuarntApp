import { NextResponse } from "next/server";
import UserModel from "@/models/Users";
import { connectDb } from "@/utils/DB";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
 connectDb()
export async function POST(request){
    try {
 
        const payload = await request.json();
        const existingUser = await UserModel.findOne({email:payload.email});
        if(existingUser){
            return NextResponse.json({message:"User already exists"},{status:400})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(payload.password,salt);
        const createUser =  await UserModel.create({
            username :payload.username,
            email:payload.email,
            password:hashedPassword,
            location:payload.location,

        })

       
    
    return NextResponse.json({message:createUser,token,success:true},{status:200})
    } catch (error) {
        return NextResponse.json({message:error.message},{status:500})
    }
}