// app/api/providers/route.js
import { cors, runMiddleware } from '@/lib/cors';
import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Member from '@/models/member';

export async function GET(req, res) {
  const { searchParams } = req.nextUrl;
  const walletAddress = searchParams.get('walletAddress');

  if (!walletAddress) {
    return NextResponse.json(
      { success: false, message: 'address is missing' },
      { status: 400 }
    );
  }
  await dbConnect();
  try {
    const member = await Member.find({
      walletAddress: walletAddress,
    });
    return NextResponse.json(
      { success: true, provider: member },
      { status: 200 }
    );
  } catch (err) {
    console.log(err.error);
  }
}
