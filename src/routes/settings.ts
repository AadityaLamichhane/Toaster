import { permission } from "process";
import Controller from "../modules/settings/controller";

const routes = [
	{
		method: "get",
		path: "settings",
		controller: Controller.get_settings,
	},
	{
		method: "get",
		path: "settings/:id",
		controller: Controller.get_setting_by_id,
	},
	{
		method: "post",
		path: "admin/settings",
		controller: Controller.post_setting,
		permissions: ["admin"]
	},
	{
		method: "put",
		path: "admin/settings/:id",
		controller: Controller.update_setting,
		permissions: ["admin"]
	},
	{
		method: "delete",
		path: "admin/settings",
		controller: Controller.delete_all,
		permissions: ["admin"]
	},
	{
		method: "post",
		path: "admin/settings/group/contact",
		controller: Controller.update_contact_details,
		permissions: ["admin"]
	},
	{
		method: "get",
		path: "settings/group/:id",
		controller: Controller.get_by_group,
	},
	{
		method: "put",
		path: "admin/settings/group/contact",
		controller: Controller.update_contact_details,
		permissions: ["admin"]
	},
	{
		method: "post",
		path: "admin/settings/group/themes",
		controller: Controller.update_theme_valiadtion,
		permissions: ["admin"]
	},
	{
		method: "put",
		path: "admin/settings/group/themes",
		controller: Controller.update_theme_valiadtion,
		permissions: ["admin"]
	},
	// Theme routes
];

export default routes;
