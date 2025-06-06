import ratelimit from "../config/upstash.js";

 

 const ratelimiter = async (req, res, next) => {
    const { success, limit, reset } = await ratelimit.limit('my-rate-limit');

    try {
      if (!success) {
        return res.status(429).json({
          message: "Too many requests, please try again later.",
          limit,
          reset,
        });
      }

      next();
    } catch (error) {
      console.error("Error checking rate limit:", error);
      return res.status(429).json({
        error: "Too many requests, please try again later.",
        limit,
        reset,
      });
    } 
  };

  export default ratelimiter