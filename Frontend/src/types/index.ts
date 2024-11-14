export interface User{
    _id: string,
    userName: string,
    password?: string,
    organization: string,
    location: string,
    resources?: [{name:string,amount:number}]
    side: "idf" | "enemy",
}

export interface missil {
    name: string,
    description: string,
    speed: number,
    intercepts: string[],
    price: number
}