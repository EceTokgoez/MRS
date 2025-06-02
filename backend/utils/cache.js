// utils/cache.js
const redis = require("redis");

let client = null;

/**
 * Redis’e bağlanmayı sağlayan fonksiyon.
 * Eğer daha önceden bağlanmış ise sadece o instance’ı döner.
 */
async function getRedisClient() {
  if (client) {
    return client;
  }

  // Ortam değişkeni varsa, onu kullan; yoksa local host:6379
  const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
  client = redis.createClient({ url: redisUrl });

  client.on("error", (err) => {
    console.error("Redis Client Error", err);
  });

  await client.connect();
  console.log("✅ Redis connected:", redisUrl);
  return client;
}

/**
 * Cache’ten key’e karşılık gelen değeri JSON parse edip döner.
 * Bulamazsa null döner.
 */
async function getFromCache(key) {
  try {
    const redisClient = await getRedisClient();
    const data = await redisClient.get(key);
    if (!data) return null;
    return JSON.parse(data);
  } catch (err) {
    console.error("Cache get hata:", err);
    return null;
  }
}

/**
 * Cache’e key-altına data’yı JSON stringify ederek yazar, EX saniye TTL uygular.
 */
async function setToCache(key, data, ttlSeconds) {
  try {
    const redisClient = await getRedisClient();
    const str = JSON.stringify(data);
    await redisClient.set(key, str, { EX: ttlSeconds });
  } catch (err) {
    console.error("Cache set hata:", err);
  }
}

module.exports = {
  getRedisClient,
  getFromCache,
  setToCache
};
