import { Request, Response } from "express";
import { IUser } from "../models/userModel";
import { generateToken } from "../utils/auth";
import { createUser ,findUserbyName} from "../services/dbservices"

// פונקציה להרשמה של משתמש חדש
export const register = async (req: Request, res: Response) => {
    
    const {userName,password,role} = req.body;
    try {
        
        const user = await createUser({userName,password,role});
      
        // אם המשתמש הוא מנהל תייצר לו טוקן
        if (user) {
            res.status(201).json({ message: "user you registered successfully" + user})
            return
      }
        else{
            res.status(400).json({message: "could not add user"})
            return
        }

    } catch (error) {
        console.log(error);
        res.status(400).json("error registering")
        return
    }
}


export const login = async (req: Request, res: Response) => {
    const { userName, password } = req.body;
   console.log(userName);
   
    const user = await findUserbyName(userName);
   
    if (!user || !(await user.comparePassword(password))) {
         res.status(401).json({ message: "Couldn't log you in"})
         return;
    };

    // לעדכן מתי נכנס
    // user.lastLogin = new Date();
    // await user.save()

    const token = generateToken(user.id, user.role)
    res.cookie('token', token, {
        httpOnly:true,
        secure: false,
        maxAge: 3600000
    })
    res.status(201).json({ message: "successfully logged in", token })}