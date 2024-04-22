import express from 'express'
import { TestController } from '../controllers/index.js'
import checkAuth from '../utils/checkAuth.js'
import checkUserIsTeacher from '../utils/checkUserIsTeacher.js'

const routerTest = express.Router()

routerTest.post(
	'/create',
	checkAuth,
	checkUserIsTeacher,
	// pageValidation,
	TestController.createTest
)

routerTest.get('/tests', TestController.getTests)

routerTest.delete(
	'/delete',
	checkAuth,
	checkUserIsTeacher,
	TestController.deleteTest
)
routerTest.get('/test', TestController.getOneTest)
// routerTest.get(
// 	'/update',
// 	checkAuth,
// 	checkUserIsAdmin,
// 	updatePageValidation,
// 	PageControllers.updatePage
// )

export default routerTest
