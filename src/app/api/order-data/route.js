import { connectDb } from "@/utils/DB";
import UserModel from "@/models/Users";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import OrderModel from "@/models/Order";
connectDb()
export async function POST(request) {
    try {
       
        let payload = await request.json();
        const order_data_valid = payload.order_data;
        order_data_valid.splice(0, 0, { order_date: new Date().toDateString() });

        const userIdExis = await OrderModel.findOne({ email: payload.email });

        if (!userIdExis) {
            await OrderModel.create({
                email: payload.email,
                order_data: [order_data_valid],
                order_date: payload.order_date
            });
            return NextResponse.json({ message: "Order Added Successfully", success: true }, { status: 200 });
        } else {
            await OrderModel.findOneAndUpdate({ email: payload.email }, {
                $push: {
                    order_data: order_data_valid
                }
            });
            return NextResponse.json({ message: "Order Added Successfully", success: true }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
}


