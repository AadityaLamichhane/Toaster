import Joi from "joi";

const memberShipValidation = Joi.object({
	member_id: Joi.number().required(),
	meeting_id: Joi.number().required(),
});

export {
	memberShipValidation,
};
