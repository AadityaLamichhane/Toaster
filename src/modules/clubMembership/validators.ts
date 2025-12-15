import Joi from "joi";
const clubMembershipValidationSchema = Joi.object({
	club_id: Joi.number().required(),
});
export {
	clubMembershipValidationSchema,
};
