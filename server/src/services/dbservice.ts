import User,{IUser} from "../models/userModel"



export const createUser = async (user: Partial<IUser>): Promise<IUser | null> => {
    console.log("inside service");
    user.resources = [ {
        name: "Badr-1",
        amount: 20
      },]
    
    const newUser = await User.create(user);
    console.log(newUser);
    
    if (!newUser) {
        throw new Error("no user"); 
       
    }
    await newUser.save()
    return newUser   
    
}
export const findUserbyName = async (name: string): Promise<IUser | null> => {
    const currentUser = await User.findOne({ userName: name });
    console.log(currentUser);
    
    if(currentUser)return currentUser;
    return null
  

}
export const getResources = async(id: string)=>{
    const resource = await User.findById(id).select('resources -_id')
    return resource
}