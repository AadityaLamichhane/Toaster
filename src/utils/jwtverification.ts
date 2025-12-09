import jwt from "jsonwebtoken"
import env from "../config/env" 
import { throwUnauthorizedError } from "./errors";
const decodeToken  =  (inputToken :string )=>{
    const splitBearer =   inputToken.includes("Bearer")? inputToken.split(' ')[1] : inputToken
    try{
        const decode:any =  jwt.verify(splitBearer,env.JWT_TOKEN); 
        if(!!decode?.id){
            return decode;
        }else{
           throwUnauthorizedError("Valid Token not found ") 
    }
    }catch(err){
        throwUnauthorizedError(`Error while decoding:\n :-> ${err}`) ;
    }
}
export default decodeToken ;    