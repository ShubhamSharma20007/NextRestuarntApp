import { connectDb } from "@/utils/DB";
import UserModel from "@/models/Users";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
connectDb()
export async function POST(request) {
    const {email,password} = await request.json();
try {

    const user = await UserModel.findOne({email});
    if(!user){
        return NextResponse.json({message:"User not found",success:false},{status:400});
    }

    // comparing password
    const isMatch =  await bcrypt.compare(password,user.password);
    if(!isMatch){
        return NextResponse.json({message:"Invalid credentials",success:false},{status:400});
    }

     //creating token
     const options =  {
        userId : user._id,
        email :user.email,
        isAdmin : user.isAdmin
    }
    const token = jwt.sign(options,"shubhamsharma",{expiresIn:"1h"})
    cookies().set('token',token,{
        secure:true,
        maxAge:360000,
    })
    return NextResponse.json({message:"Login successful",token,success:true},{status:200})
        
} catch (error) {
    return  NextResponse.json({message:error.message,success:false},{status:500})
}
}