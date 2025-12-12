import Joi from "joi";
const memberValidationSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	phone: Joi.string().optional(),
	password: Joi.string().required(),
	club_id: Joi.number().optional(),
	introduction: Joi.string().optional(),
	role: Joi.string().optional(),
});
const memberUpdateValidationSchema = Joi.object({
	name: Joi.string().optional(),
	email: Joi.string().email().optional(),
	phone: Joi.string().optional(),
	club_id: Joi.number().optional(),
	introduction: Joi.string().optional(),
	role: Joi.string().optional(),
});
export {
	memberValidationSchema,
	memberUpdateValidationSchema,
};

