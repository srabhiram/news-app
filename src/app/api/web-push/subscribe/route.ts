import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/db/connectDB'; // Adjust path
import { PushSubscription } from '@/db/models/pushnotification.models'; // Adjust path

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { subscription, deviceId } = await request.json();

    if (!subscription || !deviceId) {
      return NextResponse.json(
        { success: false, message: 'Invalid subscription or deviceId' },
        { status: 400 }
      );
    }

    // Store or update subscription
    await PushSubscription.updateOne(
      { endpoint: subscription.endpoint },
      {
        endpoint: subscription.endpoint,
        keys: subscription.keys,
        deviceId,
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving subscription:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}