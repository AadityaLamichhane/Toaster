import Controller from "./controller";

const routes = [
	{
		method: "get",
		controller: Controller.get,
		path: "agendas",
		authorization: true,
	},
	{
		method: "post",
		controller: Controller.create,
		path: "agendas",
		authorization: true,
	},
	{
		method: "get",
		controller: Controller.find,
		path: "agendas/:id",
		authorization: true,
	},
	{
		method: "patch",
		controller: Controller.update,
		path: "agendas/:id",
		authorization: true,
	},
	{
		method: "delete",
		controller: Controller.remove,
		path: "agendas/:id",
		authorization: true,
	},
];

export default routes;
