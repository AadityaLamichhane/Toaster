import informationRoute from "./info";
import checkPermissions from "../middleware/checkAuth";
import adminRoutes from "./admin"
import settingsRoutes from "./settings"
export interface IAuthRequest extends Request {
	query: any;
	params: any;
	body: any;
	user: {
		id: number;
		name: string;
		email: string;
		type: string;
	};
}
export interface IRoute {
	method: "get" | "post" | "put" | "delete" | "patch";
	path: string;
	controller: (req: Request | IAuthRequest) => Promise<void>;
	permissions?: string[];
	authorization?: boolean;
}
const routes = [
	...adminRoutes,
	...informationRoute,
	...settingsRoutes,
]
const RouteInit = (app: any) => {
	routes?.forEach((route) => {
		const { method, path, controller, permissions } = route as IRoute | any;
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


					// // Check permissions if required
					if (permissions && permissions.length > 0) {
						await checkPermissions(req);
					}

					// Execute controller
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
					if (err.message?.includes('Input buffer contains unsupported image')) {

						set.status = 422;
						return {
							success: false,
							error: "Validation Error:Invalid Image passed",
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
