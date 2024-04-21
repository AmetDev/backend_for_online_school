import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import Student from '../models/Student.js'
dotenv.config()

const SECRET = process.env.SECRET

export const updateStudent = async (req, res) => {
	try {
		console.log(req.body)

		// Проверяем, существует ли студент с указанной почтой
		const existingStudent = await Student.findOne({ email: req.body.email })

		if (!existingStudent) {
			return res.status(404).json({ message: 'Студент не найден' })
		}

		// Обновляем Teacher_uuid для существующего студента
		existingStudent.Teacher_uuid = req.body.Teacher_uuid
		existingStudent.typeUser = 'student'
		await existingStudent.save()

		const userData = existingStudent._doc

		res.status(200).json({ ...userData })
	} catch (err) {
		console.error(err)
		res.status(500).json({
			message: 'Ошибка при обновлении студента',
			error: err,
		})
	}
}
export const updateStudentParent = async (req, res) => {
	try {
		console.log(req.body)

		// Проверяем, существует ли студент с указанной почтой
		const existingStudent = await Student.findOne({ email: req.body.email })

		if (!existingStudent) {
			return res.status(404).json({ message: 'Студент не найден' })
		}

		// Обновляем Teacher_uuid для существующего студента
		existingStudent.Parent_uuid = req.body.Parent_uuid
		existingStudent.typeUser = 'student'
		await existingStudent.save()

		const userData = existingStudent._doc

		res.status(200).json({ ...userData })
	} catch (err) {
		console.error(err)
		res.status(500).json({
			message: 'Ошибка при обновлении студента',
			error: err,
		})
	}
}

export const createStudent = async (req, res) => {
	try {
		console.log(req.body)
		// const errors = validationResult(req)

		// if (!errors.isEmpty()) {
		// 	return res.status(400).json({ message: errors.array() })
		// }
		const userEmail = await Student.findOne({ email: req.body.email })
		if (userEmail) {
			return res
				.status(400)
				.json({ message: 'Пользователь уже существует с такой почтой' })
		}

		// Hash password
		const password = req.body.password
		const salt = await bcrypt.genSalt(10)
		//bcrypt.hash(newUser.password, salt , (err, hash) => { ... }

		const hashPassword = await bcrypt.hash(password, salt)

		const doc = new Student({
			fullName: req.body.fullName,
			name_parent: req.body.name_parent,
			email: req.body.email,
			gender: req.body.gender,
			password: hashPassword,
			gender: req.body.gender,
			dateBirth: req.body.dateBirth,
			Teacher_uuid: req.body.Teacher_uuid,
			Parent_uuid: req.body.Parent_uuid,
			typeUser: 'student',
		})

		const user = await doc.save()

		const token = jwt.sign(
			{
				_id: user._id,
			},
			SECRET,
			{ expiresIn: '30d' }
		)

		const userData = user._doc

		res.json({ ...userData, token })
	} catch (err) {
		console.log(err)
		res.status(500).send({
			message: 'Не удалось зарегестрироваться',
		})
	}
}

export const loginStudent = async (req, res) => {
	try {
		// const errors = validationResult(req)
		// if (!errors.isEmpty()) {
		// 	return res.status(400).json({ message: errors.array() })
		// }
		const user = await Student.findOne({ email: req.body.email })

		if (!user) {
			return res.status(400).json({ message: 'Неправильный логин или пароль' })
		}
		const isValidPassword = await bcrypt.compare(
			req.body.password,
			user._doc.password
		)

		if (!isValidPassword) {
			return res.status(400).json({ message: 'Неверный логин или пароль' })
		}
		const token = jwt.sign(
			{
				_id: user._id,
			},
			SECRET,
			{ expiresIn: '30d' }
		)

		const { password, ...userData } = user._doc

		res.status(200).json({ ...userData, token })
	} catch (error) {
		res.status(400).json({ message: 'Ошибка входа' })
	}
}

export const getStudent = async (req, res) => {
	try {
		const user = await Student.findById(req.userId)
		if (!user) {
			return res.status(404).send({
				message: 'Пользователь не найден',
			})
		}
		const { password, ...userData } = user._doc
		res.json(userData)
	} catch (error) {
		console.log(error)
		res.status(500).send({
			message: 'Не удалось получить пользователя',
		})
	}
}

export const getAllStudents = async (req, res) => {
	try {
		const { Teacher_uuid } = req.query

		// Проверьте наличие Teacher_uuid в запросе
		if (!Teacher_uuid) {
			return res.status(400).json({ message: 'Не указан Teacher_uuid' })
		}

		// Найдите всех студентов, которые соответствуют указанному Teacher_uuid
		const allStudents = await Student.find({ Teacher_uuid })

		if (!allStudents || allStudents.length === 0) {
			return res.status(404).json({ message: 'Студенты не найдены' })
		}

		res.status(200).json([allStudents])
	} catch (error) {
		res.status(500).json({ message: 'Ошибка при получении студентов', error })
	}
}
