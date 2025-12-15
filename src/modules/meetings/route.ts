import Controller from "./controller";
const routes = [
	{
		method: "get",
		controller: Controller.get,
		path: "meetings",
		//		authorization: true,
	},
	{
		method: "post",
		controller: Controller.create,
		path: "meetings",
		authorization: true,
	},
	{
		method: "get",
		controller: Controller.find,
		path: "meetings/:id",
		//	authorization: true,
	},
	{
		method: "patch",
		controller: Controller.update,
		path: "meetings/:id",
		authorization: true,
	},
	{
		method: "delete",
		controller: Controller.remove,
		path: "meetings/:id",
		authorization: true,
	},
];
export default routes;
