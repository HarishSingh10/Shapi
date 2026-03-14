import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Settings from '@/models/Settings';

export async function GET() {
  try {
    await dbConnect();
    let settings = await Settings.findOne({ key: 'global' });
    
    if (!settings) {
      settings = await Settings.create({ 
        key: 'global', 
        activeFestival: 'none',
        announcementText: "🚚 Free Shipping on Orders Above ₹499 | Use Code: SAPIS10 for 10% Off"
      });
    }
    
    // Fallback for existing records without the field
    const responseData = settings.toObject();
    if (!responseData.announcementText) {
      responseData.announcementText = "🚚 Free Shipping on Orders Above ₹499 | Use Code: SAPIS10 for 10% Off";
    }
    
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Failed to fetch festival settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { festival, announcementText } = await request.json();
    await dbConnect();
    
    const settings = await Settings.findOneAndUpdate(
      { key: 'global' },
      { 
        activeFestival: festival,
        ...(announcementText && { announcementText })
      },
      { new: true, upsert: true }
    );
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to update settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
