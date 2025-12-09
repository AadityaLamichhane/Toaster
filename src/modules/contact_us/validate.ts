import joi from "joi"
import baseValidation from "../../utils/base_validations"
const contact_number_regex = /^[0-9]/
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
export const validate_contact = joi.object({
	name_en: baseValidation.name_en.required(),
	name_ne: baseValidation.name_en.required(),
	contact_number: joi.string().max(10).pattern(contact_number_regex),
	email: joi.string().pattern(emailRegex),
	subject: joi.string(),
	messege: baseValidation.message_any.optional()
})

export const validate_update_contact = joi.object({
	name_en: baseValidation.name_en.optional(),
	name_ne: baseValidation.name_en.optional(),
	contact_number: joi.string().max(10).pattern(contact_number_regex).optional(),
	email: joi.string().pattern(emailRegex).optional(),
	subject: joi.string().optional(),
	messege: baseValidation.message_any.optional()
})
