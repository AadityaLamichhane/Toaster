import checkPermissions from "../middleware/checkAuth";
import decodeToken from "../utils/jwtverification";
import clubRoutes from "../modules/club/route"
import agendasRoutes from "../modules/agendas/route"
import meetingsRoutes from "../modules/meetings/route"
import membersRoutes from "../modules/members/route"
import membershipRoutes from "../modules/MemberMeeting/route"
import clubMembershipRoutes from "../modules/clubMembership/route"
import checkAuthentication from "../middleware/checkAuth";
export interface IAuthRequest extends Request {
	query: any;
	params: any;
	body: any;
	user: {
		id: number;
		name: string;
		email: string;
		type: string;
	} | null;
}
export interface IRoute {
	method: "get" | "post" | "put" | "delete" | "patch";
	path: string;
	controller: (req: Request | IAuthRequest) => Promise<void>;
	permissions?: string[];
	authorization?: boolean;
}
const routes = [
	...clubRoutes,
	...agendasRoutes,
	...meetingsRoutes,
	...membersRoutes,
	...membershipRoutes,
	...clubMembershipRoutes,
]
const RouteInit = (app: any) => {
	routes?.forEach((route) => {
		const { method, path, controller, permissions, authorization } = route as IRoute | any;
		app[method](
			`api/${path}`,
			async ({ body, query, params, set, headers }: any) => {
				try {
					// Create request object
					const req = {
						body: body,
						query: query,
						params: params,
						headers: headers,
						set: set,
						user: null
					};

					// Decode JWT token if authorization is required
					if (authorization) {
						const authHeader = headers?.authorization || headers?.Authorization;
						if (!authHeader) {
							throw new Error("Authorization header is required");
						}
						try {
							await checkAuthentication(req, permissions);
						} catch (err: any) {
							throw new Error("Invalid or expired token");
						}
					}
					const data = await controller(req);
					return {
						success: true,
						data: data || "",
						message: data?.message || "Success in getting the data",
					};
				} catch (err: any) {
					console.error('🚨 Route Error:', {
						path: `api/${path}`,
						method,
						message: err.message,
						name: err.name
					});
					// Handle Validation Errors
					if (err.message?.includes('Input buffer contains unsupported image') ||
						err.message?.includes("Invalid")
					) {

						set.status = 422;
						return {
							success: false,
							error: "Invalid request",
							message: err.message,
							//details: err.details || []
						};

					}
					if (err.message?.includes('Validation Error') ||
						err.message?.includes('Validation failed') ||
						err.name === 'ValidationError') {
						set.status = 422;
						return {
							success: false,
							error: "Validation Error",
							message: err.message,
							details: err.details || []
						};
					}
					// Handle Authentication Errors
					if (err.message?.includes('jwt') ||
						err.message?.includes('Unauthorized') ||
						err.message?.includes("Authorization") ||
						err.message?.includes('Authentication')) {
						set.status = 401;
						return {
							success: false,
							error: "Unauthorized",
							message: err.message
						};
					}

					// Handle Not Found Errors
					if (err.message?.includes('NOT_FOUND') || err.message?.includes('NotFoundError') ||
						err.message?.includes('Not found')) {
						set.status = 404;
						return {
							success: false,
							error: "Not Found",
							message: "Resource not found"
						};
					}
					// Handle Database Errors
					if (err.message?.includes('database') ||
						err.message?.includes('connection')) {
						set.status = 500;
						return {
							success: false,
							error: "Database Error",
							message: "Database operation failed"
						};
					}
					// Default Internal Server Error
					console.log("Something unexpected happen")
					set.status = err.status || 500;
					return {
						success: false,
						error: "Internal Server Error",
						message: process.env.NODE_ENV === 'development' ? err.message : "Something went wrong"
					};
				}
			}
		);
	});
	console.log(`✅ Registered ${routes.length} routes`);
	return app;
};

export { routes, RouteInit }; 
