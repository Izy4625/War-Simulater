import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";



export interface IUser extends Document  {
        userName: string,
        password?: string,
        organization: string,
        location?: string,
        resources?: [{name:string,amount:number}]
        side: "idf" | "enemy",
        comparePassword(userPassword: string): Promise<boolean>
           
}

const userSchema = new Schema<IUser> ({
    userName: {
        type: String,
        required: true,
       unique: true
    },
   organization: {type: String},
      password: {
            type: String,
            required: true
      },
      location:{
        type: String
      },
      resources:{type: [{name:String,amount:Number}]},
      side: {type: String,
        enum: ["idf","enemy"]
      }
   
})

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    if(this.password){
  
    this.password = await bcrypt.hash(this.password, 10);}
    next();
  });
  
  // השוואה בין הסיסמה שהמשתמש הזין לעומת ההצפנה
  userSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
    return await bcrypt.compare(userPassword, this.password)
  }
  export default mongoose.model<IUser>("User", userSchema);
  