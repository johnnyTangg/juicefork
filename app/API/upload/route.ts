import { NextResponse } from 'next/server';
import FormData from 'form-data';
import axios from 'axios';

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;

// Add OPTIONS method for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(req: Request) {
  console.log('Received upload request');
  
  try {
    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      console.error('Pinata credentials missing');
      return NextResponse.json(
        { error: 'Server configuration error - Pinata credentials missing' },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file');
    
    if (!file) {
      console.error('No file in request');
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    console.log('Processing file:', { 
      name: file.name, 
      type: file.type, 
      size: file.size 
    });

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create form data for Pinata
    const pinataFormData = new FormData();
    pinataFormData.append('file', buffer, {
      filename: file.name,
      contentType: file.type,
    });

    console.log('Sending request to Pinata...');
    
    // Upload to Pinata
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      pinataFormData,
      {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${pinataFormData.getBoundary()}`,
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    console.log('Pinata response:', response.data);

    return NextResponse.json({ 
      ipfsHash: response.data.IpfsHash,
      message: 'Upload successful' 
    });
  } catch (error: any) {
    console.error('Detailed error in upload route:', error);
    
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        response: error.response?.data,
        status: error.response?.status,
      });
      return NextResponse.json(
        { error: `Pinata upload failed: ${error.response?.data?.error || error.message}` },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: `Upload failed: ${error.message}` },
      { status: 500 }
    );
  }
} 