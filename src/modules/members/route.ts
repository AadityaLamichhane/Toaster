import Controller from "./controller";

const routes = [
	{
		method: "get",
		controller: Controller.get,
		path: "members",
		authorization: true,
	},
	{
		method: "post",
		controller: Controller.create,
		path: "members",
		authorization: true,
	},
	{
		method: "get",
		controller: Controller.find,
		path: "members/:id",
		authorization: true,
	},
	{
		method: "patch",
		controller: Controller.update,
		path: "members/:id",
		authorization: true,
	},
	{
		method: "delete",
		controller: Controller.remove,
		path: "members/:id",
		authorization: true,
	},

];

export default routes;

