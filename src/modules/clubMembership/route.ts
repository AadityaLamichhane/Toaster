import Controller from "./controller";

const routes = [
	{
		method: "get",
		controller: Controller.list,
		path: "clubmembership",
		authorization: false,
	},
	{
		method: "post",
		controller: Controller.joinClub,
		path: "clubmembership",
		authorization: false,
	},
	{
		method: "get",
		controller: Controller.find,
		path: "clubmembership/:id",
		authorization: false,
	},
	{
		method: "get",
		controller: Controller.getClubsForMember,
		path: "clubmembership/member/:memberId",
		authorization: true,
	},
	{
		method: "get",
		controller: Controller.getMembersForClub,
		path: "clubmembership/club/:clubId",
		authorization: false,
	},
	{
		method: "delete",
		controller: Controller.leaveClub,
		path: "clubmembership/:id",
		authorization: false,
	},
	{
		method: "get",
		controller: Controller.getMyclub,
		path: "clubmembership/my",
		authorization: true,
	}
];

export default routes;
