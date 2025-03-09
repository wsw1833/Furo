// app/api/member/route.js
import { cors, runMiddleware } from '@/lib/cors';
import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Member from '@/models/member';

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
    const member = await Member.find({ petId: petID });
    return NextResponse.json({ success: true, data: member }, { status: 200 });
  } catch (err) {
    console.log(err.error);
  }
}

export async function POST(req, res) {
  await dbConnect();
  try {
    const data = await req.json();
    const member = await Member.create(data);
    return NextResponse.json({ success: true, data: member }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
}
