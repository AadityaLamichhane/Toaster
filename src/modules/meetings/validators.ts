import Joi from "joi";

const meetingValidationSchema = Joi.object({
	guests: Joi.array().items(Joi.string().email()).optional(),
	theme: Joi.string().required(),
	meetingno: Joi.string().required(),
	date: Joi.string().required(),
	start_time: Joi.string().required(),
});

const meetingUpdateValidationSchema = Joi.object({
	theme: Joi.string().optional(),
	meetingno: Joi.string().optional(),
	date: Joi.string().optional(),
	start_time: Joi.string().optional(),
});

export {
	meetingValidationSchema,
	meetingUpdateValidationSchema,
};
