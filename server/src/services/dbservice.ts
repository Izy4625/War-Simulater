import User,{IUser} from "../models/userModel"



export const createUser = async (user: Partial<IUser>): Promise<IUser | null> => {
    console.log("inside service");
    
    const newUser = await User.create(user);
    console.log(newUser);
    
    if (!newUser) {
        throw new Error("no user"); 
       
    }
    await newUser.save()
    return newUser   
    
}