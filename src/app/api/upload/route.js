// app/api/upload/route.js
import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Configure S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(request) {
  try {
    // Parse the multipart form data from the request
    const formData = await request.formData();
    const file = formData.get('petImage');

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'File is required' },
        { status: 400 }
      );
    }

    // Ensure the file is an image
    const fileType = file.type;
    if (!fileType.includes('image')) {
      return NextResponse.json(
        { success: false, error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Create a unique filename
    const fileName = `${uuidv4()}-${file.name}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Configure S3 client
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    // Upload to S3
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `uploads/${fileName}`,
      Body: fileBuffer,
      ContentType: fileType,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;

    return NextResponse.json(
      {
        success: true,
        url: fileUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error uploading to S3:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to upload file',
      },
      { status: 500 }
    );
  }
}
