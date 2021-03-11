import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    if (req.headers.authorization) {
        req.user = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
        next();
    } else
        return res
            .status(400)
            .send({ message: "This route is for Authorized users only .." });
}
