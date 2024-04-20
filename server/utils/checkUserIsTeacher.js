import jwt from 'jsonwebtoken'

import Teacher from '../models/Teacher.js'
export default async (req, res, next) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.SECRET)

			const user = await Teacher.findById(decoded)

			if (user.isTeacher === true) {
				return next()
			}

			res.status(500).send({
				message: 'You is not Teacher',
			})
		} catch (err) {
			return res.status(500).send({
				message: 'Access denied',
			})
		}
	} else {
		return res.status(500).send({
			message: 'Access denied',
		})
	}
}
