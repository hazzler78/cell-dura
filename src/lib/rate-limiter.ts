interface RateLimitInfo {
  count: number;
  firstRequest: number;
}

class RateLimiter {
  private readonly windowMs: number;
  private readonly maxRequests: number;
  private readonly ipMap: Map<string, RateLimitInfo>;

  constructor(windowMs: number = 60000, maxRequests: number = 10) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.ipMap = new Map();
  }

  isRateLimited(ip: string): boolean {
    const now = Date.now();
    const rateLimitInfo = this.ipMap.get(ip);

    if (!rateLimitInfo) {
      // First request from this IP
      this.ipMap.set(ip, { count: 1, firstRequest: now });
      return false;
    }

    if (now - rateLimitInfo.firstRequest >= this.windowMs) {
      // Reset window
      this.ipMap.set(ip, { count: 1, firstRequest: now });
      return false;
    }

    if (rateLimitInfo.count >= this.maxRequests) {
      return true;
    }

    // Increment request count
    rateLimitInfo.count += 1;
    this.ipMap.set(ip, rateLimitInfo);
    return false;
  }

  getRemainingRequests(ip: string): number {
    const rateLimitInfo = this.ipMap.get(ip);
    if (!rateLimitInfo) {
      return this.maxRequests;
    }

    if (Date.now() - rateLimitInfo.firstRequest >= this.windowMs) {
      return this.maxRequests;
    }

    return Math.max(0, this.maxRequests - rateLimitInfo.count);
  }

  getResetTime(ip: string): number {
    const rateLimitInfo = this.ipMap.get(ip);
    if (!rateLimitInfo) {
      return 0;
    }

    return Math.max(0, this.windowMs - (Date.now() - rateLimitInfo.firstRequest));
  }

  // Clean up old entries periodically
  cleanup(): void {
    const now = Date.now();
    Array.from(this.ipMap.entries()).forEach(([ip, info]) => {
      if (now - info.firstRequest >= this.windowMs) {
        this.ipMap.delete(ip);
      }
    });
  }
}

// Create a singleton instance
const rateLimiter = new RateLimiter(
  60000, // 1 minute window
  10     // 10 requests per window
);

// Clean up old entries every 5 minutes
setInterval(() => rateLimiter.cleanup(), 5 * 60 * 1000);

export default rateLimiter; 