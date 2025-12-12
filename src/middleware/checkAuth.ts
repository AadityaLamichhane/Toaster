import { throwUnauthorizedError } from "../utils/errors";
import decodeToken from "../utils/jwtverification";
const ERROR_MESSAGES = {
	UNAUTHORIZED: "Unauthorized Access ",
}
const checkAuthentication = async (request: any, permissions: string) => {
	try {
		const token = request.headers["authorization"];
		if (!token) {
			throw new Error("Unauthorized access : Dont have the token");
		}
		const tokenWithoutBearer = token.startsWith("Bearer ")
			? token.split(" ")[1]
			: token;
		const decoded = decodeToken(tokenWithoutBearer);
		request.user = {
			id: decoded.id,
			username: decoded.username,
		}
		return;
	}
	// }
	catch (err: any) {
		throw new Error(err.message || "Unauthorized");
	}
};

export default checkAuthentication;
