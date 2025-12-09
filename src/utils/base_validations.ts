import joi from "joi"
import imageValidation from "./image_validation"
const DESCRIPTION_MIN_LENGTH = 20;
const DESCRIPTION_MAX_LENGTH = 10000;
const URL_PATTERN = /a/;
const baseValidation = {
	image: imageValidation,
	valid_url: joi.string().pattern(URL_PATTERN).optional(),
	content_en: joi.string()
		.min(10)
		.max(5000)
		.required()
		//	.pattern(/^[a-zA-Z0-9\s.,!?()&\-'"]+$/) //whitelisting the charactor  
		.messages({
			'string.empty': 'English content is required',
			'string.min': 'English content must be at least 10 characters long',
			'string.max': 'English content cannot exceed 5000 characters',
			'string.pattern.base': 'English content contains invalid characters'
		}),
	content_ne: joi.string()
		.min(5)
		.max(5000)
		.required()
		.messages({
			'string.empty': 'Nepali content is required',
			'string.min': 'Nepali content must be at least 5 characters long',
			'string.max': 'Nepali content cannot exceed 5000 characters'
		}),
	email: joi.string()
		.email()
		.optional()
		.allow('')
		.messages({
			'string.email': 'Please provide a valid email address'
		}),
	name_en: joi.string()
		.min(2)
		.max(100)
		.required()
		.messages({
			'string.empty': 'English name is required',
			'string.min': 'Name must be at least 2 characters long',
			'string.max': 'Name cannot exceed 100 characters',
			'string.pattern.base': 'Name can only contain letters, spaces, and periods'
		}),
	message_any: joi.string()
		.min(20)
		.max(10000)
		.required()
		.messages({
			'string.empty': 'English message is required',
			'string.min': 'English message must be at least 20 characters long',
			'string.max': 'English message cannot exceed 10000 characters'
		}),
	title: joi.string().min(3).max(200).required().messages({
		'string.empty': 'Title is required for training program',
		'string.min': 'Title must be at least 3 characters long',
		'string.max': 'Title cannot exceed 200 characters'
	})
	,
	description_ne: joi.string()
		.min(10)
		.max(DESCRIPTION_MAX_LENGTH)
		.required()
		.messages({
			'string.empty': 'Nepali description is required for Act (ऐनको नेपाली विवरण आवश्यक छ)',
			'string.min': 'Nepali description must be at least 10 characters long',
			'string.max': `Nepali description cannot exceed ${DESCRIPTION_MAX_LENGTH} characters`
		})
}
export default baseValidation; 
