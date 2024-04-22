import express from 'express'
import { ImageLoader } from '../controllers/ImageController.js'
import { PageControllers } from '../controllers/index.js'
import checkAuth from '../utils/checkAuth.js'
import checkUserIsTeacher from '../utils/checkUserIsTeacher.js'

const router = express.Router()

router.post(
	'/create',
	checkAuth,
	checkUserIsTeacher,
	// pageValidation,
	PageControllers.createPage
)
router.delete(
	'/removeimage',
	checkAuth,
	checkUserIsTeacher,
	PageControllers.deletePageImage
)
router.get('/pages', PageControllers.getPages)
router.put(
	'/imagepage',
	checkAuth,
	checkUserIsTeacher,
	PageControllers.updateImagePage
)
router.post('/uploadimage', checkAuth, ImageLoader)
router.get('/takecollege', PageControllers.getPageUrl)
router.put(
	'/topublic',
	checkAuth,

	checkUserIsTeacher,
	PageControllers.updatePageAndToPublic
)
router.get('/get', PageControllers.getPage)
router.get('/getourcollege', PageControllers.getOurCollegePages)
router.get('/pageourcollege', PageControllers.getOurCollegePagesOne)
router.get('/getpostspages', PageControllers.getOurPostsPages)
router.get('/getpagestitle', PageControllers.getPagePostsTitle)
router.get('/getpagecontent', PageControllers.getPageContent)

//router.get('/getonepage', PageControllers.getOnePage)
router.delete(
	'/pageone',
	checkAuth,
	checkUserIsTeacher,
	PageControllers.deletePage
)
router.get('/getonepage', PageControllers.getOnePage)

export default router
