import jwt from 'jsonwebtoken';
import env from "dotenv";

env.config();

export default async (req:any, res:any, next:any) => {
    const auth = req.headers.authorization;
    if(!auth) return res.status(401).json({
        error: true,
        message: 'Invalid authentication token'
    })

    const token = auth.split(' ')[0];
    try {
        const decoded = jwt.verify(token, process.env.SECRET?? process.exit(1));
        if(!decoded) {
            return res.status(401).json({
                error: true,
                message: 'The token is expired'
            })
        } else {
            req.id = decoded;
            next();
        }
    } catch {
        return res.status(401).json({
            error: true,
            message: 'The token is invalid'
        })
    }
}