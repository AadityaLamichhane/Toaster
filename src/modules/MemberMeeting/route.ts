import Controller from "./controller"
const routes = [
	{
		method: "get",
		controller: Controller.get,
		path: "member/meeting",
		authorization: true,
	},
	{
		method: "post",
		controller: Controller.subscribe,
		path: "member/meeting",
		authorization: true,
	},
	{
		method: "get",
		controller: Controller.find,
		path: "member/meeting/:id",
		authorization: true,
	},
];

export default routes;
