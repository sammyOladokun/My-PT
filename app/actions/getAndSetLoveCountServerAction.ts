"use server";

import connectToDatabase from "@/lib/database";
import LoveCount from "@/model/loveCount.model";

export async function getLoveCountServerAction() {
  try {
    const connected = await connectToDatabase();
    if (!connected) {
      return {
        success: false,
        count: 0,
      };
    }
    const loveDoc = await LoveCount.findOne({});
    return {
      success: true,
      count: loveDoc?.count ?? 0,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to get love count",
    };
  }
}

export async function setLoveCountServerAction() {
  try {
    const connected = await connectToDatabase();
    if (!connected) {
      return {
        success: false,
        message: "Database is not configured",
      };
    }
    const loveCount = await LoveCount.findOneAndUpdate(
      {},
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    return {
      success: true,
      count: loveCount.count,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update love count",
    };
  }
}
