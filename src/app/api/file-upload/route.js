import { NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import userProfileModel from "@/models/UserProfileModel";
import { connectDb } from "@/utils/DB";
import path from "path";
import { randomBytes } from "crypto";

// Ensure the database connection is established
 connectDb();
 
export async function POST(req) {
  try {
    const user_mail = req.nextUrl.searchParams.get('user');
    const data = await req.formData();
    const file = data.get('file');
    if (!file) {
      return NextResponse.json({ message: 'file not found' }, { status: 400 });
    }

    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const filename = randomBytes(6).toString('hex') + path.extname(file.name);
    const storePath = path.join('./public/uploads/', filename);

    const existingImage = await userProfileModel.findOne({ user_gmail: user_mail });
    if (existingImage) {
      const oldPath = path.join('./public/uploads/', existingImage.image_endpoint + path.extname(file.name));
      await userProfileModel.findByIdAndUpdate(existingImage._id, { $set: { image_endpoint: filename } });
      await writeFile(storePath, buffer);
      await unlink(path.join('./public/uploads/'+ existingImage.image_endpoint));
      return NextResponse.json({ message: 'file updated' }, { status: 200 });
    }

    const newImage = await userProfileModel.create({ user_gmail: user_mail, image_endpoint: filename });
    await writeFile(storePath, buffer);
    return NextResponse.json({ message: 'file uploaded', create: newImage }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'file not uploaded', error: error.message }, { status: 400 });
  }
}
