import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import Parent from '../models/Parent.js'
dotenv.config()

const SECRET = process.env.SECRET

export const createParent = async (req, res) => {
	try {
		console.log(req.body)
		// const errors = validationResult(req)

		// if (!errors.isEmpty()) {
		// 	return res.status(400).json({ message: errors.array() })
		// }
		const userEmail = await Parent.findOne({ email: req.body.email })
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

		const doc = new Parent({
			fullName: req.body.fullName,

			email: req.body.email,
			gender: req.body.gender,
			password: hashPassword,
			gender: req.body.gender,
			dateBirth: req.body.dateBirth,
			student_uuid: req.body.student_uuid,
			typeUser: 'parent',
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

export const loginParent = async (req, res) => {
	try {
		// const errors = validationResult(req)
		// if (!errors.isEmpty()) {
		// 	return res.status(400).json({ message: errors.array() })
		// }
		console.log('req.body.email', req.body.email)
		const user = await Parent.findOne({ email: req.body.email })

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

export const getParent = async (req, res) => {
	try {
		const user = await Parent.findById(req.userId)
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
