import mongoose from 'mongoose';
import { env } from './env';    


export async function connectDB(uri:string= env.mongourl): Promise<void> {
   await mongoose.connect(uri);
}

export async function disconnectDB(): Promise<void> {
    await mongoose.disconnect();
}