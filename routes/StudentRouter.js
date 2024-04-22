import express from 'express'
import { StudentController } from '../controllers/index.js'
import checkAuth from '../utils/checkAuth.js'
import checkUserIsTeacher from '../utils/checkUserIsTeacher.js'
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
StudentRouter.put('/student', checkAuth, StudentController.updateStudent)
StudentRouter.put(
	'/studentparent',
	checkAuth,
	StudentController.updateStudentParent
)
StudentRouter.get('/me', checkAuth, StudentController.getStudent)
StudentRouter.get('/studentforparent', StudentController.getAllStudentParent)
export default StudentRouter
StudentRouter.get(
	'/students',
	checkAuth,
	checkUserIsTeacher,
	StudentController.getAllStudents
)
