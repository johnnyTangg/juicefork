import { NextResponse } from 'next/server';
import axios from 'axios';

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;

export async function POST(request: Request) {
  console.log('Received metadata upload request');
  
  try {
    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      console.error('Pinata credentials missing');
      return NextResponse.json(
        { error: 'Server configuration error - Pinata credentials missing' },
        { status: 500 }
      );
    }

    const metadata = await request.json();
    
    if (!metadata) {
      console.error('No metadata in request');
      return NextResponse.json(
        { error: 'No metadata provided' },
        { status: 400 }
      );
    }

    console.log('Processing metadata:', metadata);

    // Upload to Pinata
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      metadata,
      {
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY,
        },
      }
    );

    console.log('Pinata response:', response.data);

    return NextResponse.json({ 
      ipfsHash: response.data.IpfsHash,
      message: 'Metadata upload successful' 
    });
  } catch (error) {
    console.error('Detailed error in metadata upload route:', error);
    
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