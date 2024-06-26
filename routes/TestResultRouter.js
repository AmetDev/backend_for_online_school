import express from 'express'
import { ResultTestController } from '../controllers/index.js'
import checkAuth from '../utils/checkAuth.js'
const routerTestResult = express.Router()
routerTestResult.post(
	'/result_test',
	checkAuth,
	ResultTestController.setResultTest
)
routerTestResult.get(
	'/result_test',
	checkAuth,
	ResultTestController.getResultByUUIDs
)
routerTestResult.get(
	'/all_tests',
	checkAuth,
	ResultTestController.getAllResultStudents
)
routerTestResult.get(
	'/all_tests_teacher',
	checkAuth,
	ResultTestController.getAllResultStudentsTeacher
)
export default routerTestResult
