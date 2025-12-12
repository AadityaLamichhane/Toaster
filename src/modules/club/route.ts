import Controller from "./controller";

const routes = [
	{
		method: "get",
		controller: Controller.get,
		path: "club",
		authorization: true,
	},
	{
		method: "post",
		controller: Controller.create,
		path: "club",
		authorization: true,
	},
	{
		method: "get",
		controller: Controller.find,
		path: "club/:id",
		authorization: true,
	},
	{
		method: "patch",
		controller: Controller.update,
		path: "club/:id",
		authorization: true,
	},
	{
		method: "delete",
		controller: Controller.remove,
		path: "club/:id",
		authorization: true,
	},
];

export default routes;
