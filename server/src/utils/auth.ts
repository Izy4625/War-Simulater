import jwt from 'jsonwebtoken';
import {Types} from "mongoose"

export const generateToken = (_id: Types.ObjectId, role:string): string => {
    return jwt.sign({_id, role}, "Eibeshter_Hot_Mich_lib", {expiresIn: '1h'})
}