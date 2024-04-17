import express from 'express'
import { ImageLoader } from '../controllers/ImageController.js'
import { PageControllers } from '../controllers/index.js'
import checkAuth from '../utils/checkAuth.js'

const router = express.Router()

router.post(
	'/create',
	checkAuth,

	// pageValidation,
	PageControllers.createPage
)
router.delete(
	'/removeimage',
	checkAuth,

	PageControllers.deletePageImage
)
router.put(
	'/imagepage',
	checkAuth,

	PageControllers.updateImagePage
)
router.post('/uploadimage', checkAuth, ImageLoader)
router.get('/takecollege', PageControllers.getPageUrl)
router.put(
	'/topublic',
	checkAuth,

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
	'/delete',
	checkAuth,

	PageControllers.deletePage
)
router.get('/getonepage', PageControllers.getOnePage)
// router.get(
// 	'/update',
// 	checkAuth,
// 	checkUserIsAdmin,
// 	updatePageValidation,
// 	PageControllers.updatePage
// )

export default router
