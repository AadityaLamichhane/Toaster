import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
const server = new Elysia({
	serve: {
		maxRequestBodySize: 1024 * 1024 * 100,
	},
}).mapResponse(({ response, set }: any) => {
	console.log(`This is the responce of the server ${response}`);
}).get("/", () => " server is running ")
	.all("/api/*", ({ set, path }: any) => {
		console.log(`❌ API route not found: ${path}`);
		set.status = 404;
		return {
			success: false,
			error: "Not Found",
			message: `Api:${path} not found`

		};
	})
	.all("*", ({ set, path }: any) => {
		set.status = 404;
		return {
			success: false,
			error: "Not Found",
			message: `Route ${path} not found`
		};
	}).post('/', (data) => {
		console.log(`the post request is ${JSON.stringify(data)}`);
		return
	}).use(cors({
		origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:9000"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	}))

export default server; 
