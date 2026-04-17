import { app } from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

async function startServer():Promise<void> {
    await connectDB();
    app.listen(env.port, () => {
        console.log(`Server is running on port ${env.port}`);
    });
}

startServer().catch((error) => {
    console.error("Error starting the server:", error);
    process.exit(1);
});