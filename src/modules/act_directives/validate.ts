import Joi from "joi";
import baseValidation from "../../utils/base_validations";
export const act_validation = Joi.object({
	description_en: baseValidation.description_ne,
	description_ne: baseValidation.description_ne
});
export const regulation_validation = Joi.object({
	description_en: baseValidation.description_ne,
	description_ne: baseValidation.description_ne
});
export const procedure_validation = Joi.object({
	description_en: baseValidation.description_ne,
	description_ne: baseValidation.description_ne
});
export const directive_validation = Joi.object({
	description_en: baseValidation.description_ne,
	description_ne: baseValidation.description_ne
});
export const act_update_validation = Joi.object({
	description_en: baseValidation.description_ne.optional(),
	description_ne: baseValidation.description_ne.optional()
});
export const directive_update_validation = Joi.object({
	description_en: baseValidation.description_ne.optional(),
	description_ne: baseValidation.description_ne.optional()
});
export const procedure_update_validation = Joi.object({
	description_en: baseValidation.description_ne.optional(),
	description_ne: baseValidation.description_ne.optional()
});
export const regulation_update_validation = Joi.object({
	description_en: baseValidation.description_ne.optional(),
	description_ne: baseValidation.description_ne.optional()
});
