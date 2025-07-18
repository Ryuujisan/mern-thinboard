import { Redis } from '@upstash/redis'
import {Ratelimit} from "@upstash/ratelimit";


const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(20,"60 s"),
});

export default rateLimit;