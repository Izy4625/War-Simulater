import jwt from 'jsonwebtoken';
import {Types} from "mongoose"
import dotenv from "dotenv";
dotenv.config()
export const generateToken = (_id: Types.ObjectId, side:string): string => {
    return jwt.sign({_id, side}, process.env.JWT_SECRET as string, {expiresIn: '1h'})
}