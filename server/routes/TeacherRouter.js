import express from 'express'
import { TeacherController } from '../controllers/index.js'
import checkAuth from '../utils/checkAuth.js'
import { loginStudentValidation } from '../validation/StudentValidation/StudentValidation.js'
import { registerTeacherValidation } from '../validation/TeacherValidation/TeacherValidation.js'
const TeacherRouter = express.Router()

TeacherRouter.post(
	'/register',
	registerTeacherValidation,
	TeacherController.createTeacher
)
TeacherRouter.post(
	'/login',
	loginStudentValidation,
	TeacherController.loginTeacher
)
TeacherRouter.get('/me', checkAuth, TeacherController.getTeacher)
export default TeacherRouter
