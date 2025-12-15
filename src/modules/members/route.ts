import Controller from "./controller";

const routes = [
	{
		method: "post",
		controller: Controller.signup,
		path: "members/signup",
	},
	{
		method: "post",
		controller: Controller.login,
		path: "members/login",
	},
	{
		method: "get",
		controller: Controller.get,
		path: "members",
	},
	{
		method: "post",
		controller: Controller.signup,
		path: "members",
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

