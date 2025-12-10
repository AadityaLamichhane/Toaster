import Controller from "./controller";

const routes = [
	{
		method: "get",
		controller: Controller.get,
		path: "membership",
		authorization: true,
	},
	{
		method: "post",
		controller: Controller.subscribe,
		path: "membership",
		authorization: true,
	},
	{
		method: "get",
		controller: Controller.find,
		path: "membership/:id",
		authorization: true,
	},
	{
		method: "get",
		controller: Controller.getByMember,
		path: "membership/member/:memberId",
		authorization: true,
	},
	{
		method: "get",
		controller: Controller.getByMeeting,
		path: "membership/meeting/:meetingId",
		authorization: true,
	},
	{
		method: "delete",
		controller: Controller.unsubscribe,
		path: "membership/:id",
		authorization: true,
	},
];

export default routes;
