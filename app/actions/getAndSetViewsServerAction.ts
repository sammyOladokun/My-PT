'use server';

import connectToDatabase from '@/lib/database';
import View from '@/model/views.model';

export async function getViewsServerAction() {
  try {
    const connected = await connectToDatabase();
    if (!connected) {
      return {
        success: false,
        message: 0,
      };
    }

    const viewDoc = await View.findOne({});

    return {
      success: true,
      message: viewDoc?.views ?? 0,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to get views',
    };
  }
}

export async function setViewsServerAction() {
  try {
    const connected = await connectToDatabase();
    if (!connected) {
      return {
        success: false,
        message: 'Database is not configured',
      };
    }

    await View.findOneAndUpdate(
      {},
      { $inc: { views: 1 } },
      { new: true, upsert: true }
    );

    return {
      success: true,
      message: 'Views set successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to set views',
    };
  }
}
