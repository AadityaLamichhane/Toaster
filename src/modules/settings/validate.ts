import Joi, { ObjectSchema } from "joi";
import baseValidation from "../../utils/base_validations";
export const setting_table_validation = Joi.object({
	group: Joi.string().optional(),
	key: Joi.string().required(),
	value: Joi.string().required(),
	title: Joi.string().optional(),
	file: baseValidation.image.optional()
});
export const contact_details_validation = Joi.object({
	phonenumber: Joi.string().optional(),
	mail: Joi.string().email().optional(),
	location: Joi.string().optional(),
	whatsapp: Joi.string().optional(),
	copyright_text: Joi.string().max(100).optional(),
	facebook_link: Joi.string().optional(),
	instagram_link: Joi.string().optional(),
	linkedin_link: Joi.string().optional(),
	twitter_link: Joi.string().optional(),
	youtube_link: Joi.string().optional(),
	tiktok_link: Joi.string().optional(),
	logo: baseValidation.image.optional(),
	favicon: baseValidation.image.optional()
});
export const theme_validation = Joi.object({
	hero_logo: baseValidation.image.optional(),
	footer_logo: baseValidation.image.optional(),
	footer_text: Joi.string().optional(),
	primary_color: Joi.string().optional(),
	primary_light_color: Joi.string().optional(),
	secondary_color: Joi.string().optional(),
})
export type Setting_Type_Validation = ReturnType<typeof setting_table_validation.validate>['value'];
export type Contact_Details_Validation = ReturnType<typeof contact_details_validation.validate>['value'];

export type ThemeValidationType = ReturnType<typeof theme_validation.validate>['value'];
