import Joi from "joi";

const clubValidationSchema = Joi.object({
	name: Joi.string().required(),
	area: Joi.string().optional(),
});

const clubUpdateValidationSchema = Joi.object({
	name: Joi.string().optional(),
	area: Joi.string().optional(),
});

export {
	clubValidationSchema,
	clubUpdateValidationSchema,
};
