import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {

    try {

        const {succes} = await rateLimit.limit("fdfdsfs")
        console.log("user id: " + req.userId +" succes: " + succes);
        if(!succes) {
            res.status(429).json({message:"To many requests, please try again later"})
        }
        next();

    }catch (error) {
        console.error(`rate error${error}`);
        res.status(400).json({message:"Something went wrong"})
    }

}

export default rateLimiter;