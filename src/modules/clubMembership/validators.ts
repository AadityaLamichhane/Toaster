import Joi from "joi";

const clubMembershipValidationSchema = Joi.object({
	member_id: Joi.number().required(),
	club_id: Joi.number().required(),
});

export {
	clubMembershipValidationSchema,
};
