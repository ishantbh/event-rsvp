import { redis } from '@/lib/redis'

export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
) {
  const current = await redis.incr(key)

  if (current === 1) {
    await redis.expire(key, windowSeconds)
  }

  return current <= limit
}
