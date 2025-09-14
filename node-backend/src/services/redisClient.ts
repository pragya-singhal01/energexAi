import { createClient } from "../../node_modules/redis/dist/index.js";

const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redis.on('error', (err: any) => console.error('Redis Client Error', err));

await redis.connect();

export default redis;