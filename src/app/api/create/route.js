// app/api/create/route.js
import { cors, runMiddleware } from '@/lib/cors';
import dbConnect from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import Pet from '@/models/pet';
export async function GET(req, res) {}

export async function POST(req, res) {
  await dbConnect();
  try {
    const data = await req.json();
    const pet = await Pet.create(data);
    return NextResponse.json({ success: true, data: pet }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
}
