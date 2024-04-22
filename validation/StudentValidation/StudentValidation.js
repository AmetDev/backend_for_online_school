import { body } from 'express-validator'

export const registerStudentValidation = [
	body('fullName', 'Данный формат имени не поддерживается').isString({
		min: 5,
		max: 30,
	}),
	body('name_parent', 'Данный формат имени не поддерживается').isString({
		min: 5,
		max: 30,
	}),
	body('password', 'Пароль должен содержать более 8 символов').isLength({
		min: 8,
	}),

	body('email', 'Некорректный формат почты').isEmail(),
]

export const loginStudentValidation = [
	body('email', 'Некорректный формат почты').isEmail(),
	body('password', 'Неверный формат пароля').isString({ min: 8 }),
]
