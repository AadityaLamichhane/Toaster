import joi from "joi";
import imageValidation from "../../utils/image_validation"
import baseValidation from "../../utils/base_validations";
export const training_validation = joi.object({
	title_en: baseValidation.title.required(),
	title_ne: baseValidation.title.required(),
	event_date: joi.date().required().messages({
		'date.base': 'Event date must be a valid date',
		'any.required': 'Event date is required'
	}),
	event_venue: joi.string().min(3).max(500).required().messages({
		'string.empty': 'Event venue is required',
		'string.min': 'Venue must be at least 3 characters long',
		'string.max': 'Venue cannot exceed 500 characters'
	}),
	description: joi.string().min(10).max(5000).required().messages({
		'string.empty': 'Description is required',
		'string.min': 'Description must be at least 10 characters long',
		'string.max': 'Description cannot exceed 5000 characters'
	}),
	added_images: joi.array().items(imageValidation).max(4),
	thumbnail_image: imageValidation.optional()
});
export type Training_type = typeof training_validation;
