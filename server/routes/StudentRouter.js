import express from 'express'
import { StudentController } from '../controllers/index.js'
import checkAuth from '../utils/checkAuth.js'
import {
	loginStudentValidation,
	registerStudentValidation,
} from '../validation/StudentValidation/StudentValidation.js'
const StudentRouter = express.Router()

StudentRouter.post(
	'/register',
	registerStudentValidation,
	StudentController.createStudent
)
StudentRouter.post(
	'/login',
	loginStudentValidation,
	StudentController.loginStudent
)
StudentRouter.get('/me', checkAuth, StudentController.getStudent)
export default StudentRouter
