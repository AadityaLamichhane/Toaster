import joi from "joi"
import baseValidation from "../../utils/base_validations";
export const admin_information = joi.object({
	username: baseValidation.email,
	password: joi.string().max(18).min(6)
});
export const admin_upadte_validation = joi.object({
	username: baseValidation.email.optional(),
	password: joi.string().max(18).min(6)
});

