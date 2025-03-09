// app/api/reminder/route.js
import { cors, runMiddleware } from '@/lib/cors';
import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Reminder from '@/models/reminder';
export async function GET(req, res) {
  const { searchParams } = req.nextUrl;
  const petID = searchParams.get('petId');

  if (!petID) {
    return NextResponse.json(
      { success: false, message: 'petID is missing' },
      { status: 400 }
    );
  }
  await dbConnect();
  try {
    const reminder = await Reminder.find({ petId: petID });
    return NextResponse.json(
      { success: true, data: reminder },
      { status: 200 }
    );
  } catch (err) {
    console.log(err.error);
  }
}

export async function POST(req, res) {
  await dbConnect();
  try {
    const data = await req.json();
    const reminder = await Reminder.create(data);
    return NextResponse.json(
      { success: true, data: reminder },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
}
