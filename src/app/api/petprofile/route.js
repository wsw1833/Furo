// app/api/petprofile/route.js
import { cors, runMiddleware } from '@/lib/cors';
import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Pet from '@/models/pet';
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
    const profile = await Pet.findById(petID);
    return NextResponse.json({ success: true, profile }, { status: 200 });
  } catch (err) {
    console.log(err.error);
  }
}

export async function POST(request) {
  // Handle POST
}
