import Joi from "joi";
import imageValidation from "../../utils/image_validation";
import baseValidation from "../../utils/base_validations";
export const VALID_POSITIONS_EN = [
	'Director',
	'Deputy Director',
	'Assistant Director',
	'Senior Training Officer',
	'Training Officer',
	'Program Coordinator',
	'Administrative Officer',
	'IT Officer',
	'Finance Officer',
	'HR Officer',
];

export const VALID_POSITIONS_NE = [
	'निर्देशक',
	'उप–निर्देशक',
	'सहायक निर्देशक',
	'वरिष्ठ तालिम अधिकृत',
	'तालिम अधिकृत',
	'कार्यक्रम संयोजक',
	'प्रशासन अधिकृत',
	'आईटी अधिकृत',
	'लेखा अधिकृत',
	'मानव संसाधन अधिकृत',
];
// Introduction validation schema
export const introduction_validation = Joi.object({
	content_en: baseValidation.content_en,
	content_ne: baseValidation.content_ne,
});
export const staff_validation = Joi.object({
	name_en: baseValidation.name_en,
	name_ne: baseValidation.name_en,
	facebook_link: Joi.string().optional().allow(""),
	twitter_link: Joi.string().optional().allow(""),
	instagram_link: Joi.string().optional().allow(""),
	position_en: Joi.string()
		.valid(...VALID_POSITIONS_EN)
		.required()
		.messages({
			'string.empty': 'Position is required',
			'any.only': `Position must be one of: ${VALID_POSITIONS_EN.join(', ')}`
		}),
	position_ne: Joi.string()
		.valid(...VALID_POSITIONS_NE)
		.required()
		.messages({
			'string.empty': 'Nepali position is required',
			'any.only': `Nepali position must be one of: ${VALID_POSITIONS_NE.join(', ')}`
		}),
	email: baseValidation.email.required(),
	phone: Joi.string()
		.pattern(/^(\+977[-\s]?)?[0-9]{10}$|^(\+977[-\s]?)?[0-9]{8}$/)
		.optional()
		.allow('')
		.messages({
			'string.pattern.base': 'Phone number must be a valid Nepali number (10 digits) or 8 digits for landline'
		}),
	photo: baseValidation.image.optional()
});
export const director_message_validation = Joi.object({
	message_en: baseValidation.message_any,
	message_ne: baseValidation.message_any
})
