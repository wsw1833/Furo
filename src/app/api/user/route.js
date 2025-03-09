// app/api/user/route.js
import { cors, runMiddleware } from '@/lib/cors';
import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Pet from '@/models/pet';
export async function GET(req, res) {
  const { searchParams } = req.nextUrl;
  const walletAddress = searchParams.get('walletAddress');

  if (!walletAddress) {
    return NextResponse.json(
      { success: false, message: 'walletAddress is required' },
      { status: 400 }
    );
  }
  await dbConnect();
  try {
    const profiles = await Pet.find({ walletAddress: walletAddress });
    return NextResponse.json(
      { success: true, profile: profiles },
      { status: 200 }
    );
  } catch (err) {
    console.log(err.error);
  }
}

export async function POST(req, res) {}
