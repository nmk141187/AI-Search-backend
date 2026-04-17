import dotenv from 'dotenv';    

dotenv.config();

function getEnvVariable(key: string, defaultValue?: string): string {
    const value = process.env[key] ?? defaultValue;
    if(!value) {
        throw new Error(`Environment variable ${key} is not set.`);
    }
    return value;
}

export const env = {
    port: Number(process.env.PORT ?? 3000),
    mongourl: getEnvVariable('MONGO_URL', 'mongodb://localhost:27017/ai-search-prospect'),
    nodeEnv: process.env.NODE_ENV ?? 'development'
};