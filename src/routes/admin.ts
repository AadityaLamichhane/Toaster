
import Controller from "../modules/admin/controller"
const routes = [
	{
		method: "post",
		path: "admin/login",
		controller: Controller.admin_login,
	},
	{
		method: "post",
		path: "admin/signup",
		controller: Controller.admin_signup
	}
]

export default routes;
