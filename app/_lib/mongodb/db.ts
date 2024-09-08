import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

export async function connectToMongoDB() {
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    const uri = process.env.MONGODB_URI!;
    global.mongoose.promise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }
  try {
    global.mongoose.conn = await global.mongoose.promise;
  } catch (e) {
    global.mongoose.promise = null;
    throw e;
  }

  return global.mongoose.conn;
}
