// app/api/ipfs/route.js
import { NextResponse } from 'next/server';
import { pinata } from '@/lib/utils';

export async function POST(req, res) {
  try {
    const data = await req.json();
    const { cid } = await pinata.upload.public.json({ data });
    return NextResponse.json(cid, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
