import { NextResponse } from "next/server";

import userProfileModel from "@/models/UserProfileModel";
import { connectDb } from "@/utils/DB";

connectDb();


export async function GET(req,{params}) {
    const { gmail } = params;
    console.log(gmail)
  const response = await userProfileModel.findOne({user_gmail:gmail})
  if(response){
    return NextResponse.json({ response }, { status: 200 })
  }
  return NextResponse.json({ message: "No user found" }, { status: 404 })
}


