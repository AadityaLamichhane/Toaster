import Controller from "../modules/info_and_dload/controller";
const routes = [
	{
		method: "get",
		path: "info/budget",
		controller: Controller.get_budget_progress,
	},
	{
		method: "get",
		path: "info/budget/:id",
		controller: Controller.get_budget_by_id,
	},
	{
		method: "post",
		path: "admin/info/budget",
		controller: Controller.set_budget_progress,
		permissions: ['admin']
	},
	{
		method: "get",
		path: "info/general",
		controller: Controller.get_general_info,
	},
	{
		method: "get",
		path: "info/general/:id",
		controller: Controller.get_general_by_id,
	},
	{
		method: "post",
		path: "admin/info/general",
		controller: Controller.set_general_info,
		permissions: ['admin']
	},
	{
		method: "put",
		path: "admin/info/budget",
		controller: Controller.update_budget_progress,
		permissions: ['admin']
	},
	{
		method: "delete",
		path: "admin/info/budget",
		controller: Controller.delete_all_budget,
		permissions: ['admin']
	},
	{
		method: "delete",
		path: "admin/info/budget/:id",
		controller: Controller.delete_budget_id,
		permissions: ['admin']
	},
	{
		method: "put",
		path: "admin/info/general/:id",
		controller: Controller.update_general_info,
		permissions: ['admin']
	},
	{
		method: "delete",
		path: "admin/info/general",
		controller: Controller.delete_all_general,
		permissions: ['admin']
	},
	{
		method: "delete",
		path: "admin/info/general/:id",
		controller: Controller.delete_general_id,
		permissions: ['admin']
	},
	{
		method: "delete",
		path: "admin/info/forms/:id",
		controller: Controller.delete_forms_format,
		permissions: ['admin']
	},
	{
		method: "put",
		path: "admin/info/forms/:id",
		controller: Controller.update_forms_formats,
		permissions: ['admin']
	},
	{
		method: "put",
		path: "admin/info/budget/:id",
		controller: Controller.update_budget_progress,
		permissions: ['admin']
	},
	{
		method: "post",
		path: "admin/info/forms",
		controller: Controller.set_forms_formats,
		permissions: ['admin']
	},
	{
		method: "get",
		path: "info/forms",
		controller: Controller.get_forms_formats,
	},
	{
		method: "get",
		path: "info/forms/:id",
		controller: Controller.get_forms_formats,
	},
];
export default routes; 
