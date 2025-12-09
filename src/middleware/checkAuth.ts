import { throwUnauthorizedError } from "../utils/errors";
import  decodeToken from "../utils/jwtverification";
const ERROR_MESSAGES = {
    UNAUTHORIZED:"Unauthorized Access ",
}
const checkAuthentication = async (request: any ) => {
  try {
    const token = request.headers["authorization"];
    if (!token) {
      throw new Error("Unauthorized access : Dont have the token");
    }
    const tokenWithoutBearer = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;
    const decoded =  decodeToken(tokenWithoutBearer);
    // if (!decoded) {
    //   throw new Error(`${ERROR_MESSAGES.UNAUTHORIZED}: Unexpedted autherization error`);
    // } else {
      
        if(decoded.permissions !="admin"){
            throwUnauthorizedError("User Dont have permission to perform this actions");
        }
       request.user = {
        id: decoded.id , 
        username:decoded.username , 
        permissions:decoded.permissions
       }
       return ; 
      }
    // }
   catch (err: any) {
    throw new Error(err.message || "Unauthorized");
  }
};

export default checkAuthentication;
