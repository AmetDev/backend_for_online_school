import { validationResult } from 'express-validator'
import PageModel from '../models/Page.js'
import Test from '../models/Test.js'

// export const updateImagePage = async (req, res) => {
// 	try {
// 		console.log('true')
// 		const { pageUrl, pageImageUrl, isUpdatedImage } = req.body
// 		console.log(pageUrl, pageImageUrl)
// 		const updateImagesPage = await PageModel.findOneAndUpdate(
// 			{ pageUrl },
// 			isUpdatedImage && { pageImage: pageImageUrl }
// 		)
// 		console.log('9u', updateImagesPage)
// 		return res.status(200).json({ updateImagesPage })
// 	} catch (error) {
// 		return res.status(500).json({ message: 'ошибка сервера' })
// 	}
// }
// export const deletePageImage = async (req, res) => {
// 	try {
// 		console.log('true')
// 		const { pageUrl } = req.body
// 		console.log(pageUrl)
// 		const updateImagesPage = await Test.findOneAndUpdate(
// 			{ pageUrl },
// 			{ pageImage: '' }
// 		)
// 		console.log('9u', updateImagesPage)
// 		return res.status(200).json({ updateImagesPage })
// 	} catch (error) {
// 		return res.status(500).json({ message: 'ошибка сервера' })
// 	}
// }
export const createPage = async (req, res) => {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({ message: errors.array() })
		}

		const {
			testUrl,
			name_test,
			questions_text,
			question_type,
			pageTypePublish,
			imgOrText,
			answer,
			Teacher_uuid,
		} = req.body

		const existingPage = await Test.findOne({ testUrl })
		if (existingPage) {
			return res
				.status(400)
				.json({ message: 'Адрес страницы должен быть уникален' })
		}
		const newPage = new Test({
			name_test,
			questions_text,
			question_type,
			pageTypePublish,
			imgOrText,
			answer,
			Teacher_uuid,
		})
		const somedate = await newPage.save()
		console.log(somedate)
		res.json(req.body)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Failed to create page:' + err,
		})
	}
}

export const getOneTest = async (req, res) => {
	try {
		const { url } = req.query
		console.log('qiuet', req.query)
		console.log(req.params)
		console.log('fdfsdfsdfs')

		let wordWithoutSlash = url.substring(1)

		const result = await Test.findOne({ testUrl: wordWithoutSlash })
		if (result == null) {
			return res.status(404).json({ message: 'объект не был найден' })
		} else {
			console.log(result)
			return res.status(200).json({ message: result })
		}
	} catch (error) {
		return res.status(500).json({ message: 'ошибка сервера' })
	}
}

export const getTests = async (req, res) => {
	try {
		const arrPages = await Test.find()
		console.log(arrPages)
		res.send(arrPages)
	} catch (error) {
		console.log(error)
	}
}
export const getTestOnePage = async (req, res) => {
	try {
		const { testUrl } = req.query
		const arrPages = await PageModel.findOne({ testUrl, pageTypePublish: true })

		if (null == arrPages) {
			return res.status(404).json({ message: 'Не удалось найти страницу' })
		}
		res.send(arrPages)
	} catch (error) {
		console.log(error)
		res.send(error)
	}
}

// export const getOurPostsPages = async (req, res) => {
// 	try {
// 		const { increment } = req.body
// 		console.log('increment', increment)
// 		// const arrPages = await PageModel.find({
// 		// 	pageType: 'post',
// 		// 	pageTypePublish: true,
// 		// })
// 		const arrPages = await PageModel.find({
// 			pageType: 'post',
// 			pageTypePublish: true,
// 		})
// 			.sort({ _id: -1 })
// 			.limit(3)

// 		res.send(arrPages)
// 	} catch (error) {
// 		console.log(error)
// 		res.status(500).json({ message: 'произошла ошибка при получении страниц' })
// 	}
// }

// export const updatePageAndToPublic = async (req, res) => {
// 	try {
// 		const ID = await Test.find({ testUrl: req.body.testUrl })
// 		const ID_Obj = { _id: ID[0]._id }
// 		console.log('ID', ID_Obj)

// 		const update = req.body.textValue
// 		console.log('update', req.body.titlePage)
// 		const doc = await PageModel.findOneAndUpdate(
// 			{ pageUrl: req.body.URLPage },
// 			{
// 				pageContent: update,
// 				pageTypePublish: true,
// 				pageTitle: req.body.titlePage,
// 			}
// 		)

// 		const doc1 = await PageModel.find({ pageUrl: req.body.URLPage })
// 		res.status(200).json({
// 			message: 'Страница успешно опубликована!',
// 			data: doc1,
// 		})
// 	} catch (err) {
// 		console.log(err)
// 		res.status(500).json({
// 			message: 'Failed to add page',
// 		})
// 	}
// }

// export const getPage = async (req, res) => {
// 	try {
// 		const pageUrl = req.query.url

// 		const doc = await PageModel.findOneAndUpdate(
// 			{ pageUrl: pageUrl },
// 			{ $inc: { viewsCount: 1 } },
// 			{ new: true } // Чтобы получить обновленный документ
// 		)

// 		if (!doc) {
// 			return res.status(404).json({
// 				message: 'Страница не найдена',
// 			})
// 		}

// 		res.status(200).json(doc)
// 	} catch (err) {
// 		console.log(err)
// 		res.status(500).json({
// 			message: 'Failed to create page',
// 		})
// 	}
// }

export const deleteTest = async (req, res) => {
	try {
		const pageUrl = req.query.id
		//console.log(req)
		//console.log(pageUrl)
		const page = await Test.findByIdAndDelete(pageUrl)
		if (!page) {
			return res.status(404).json({
				message: 'Страница не найдена',
			})
		}
		console.log('p', page._doc)
		res.status(200).json({ message: 'объект был удален' })
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Failed to create page',
		})
	}
}

// export const getPageContent = async (req, res) => {
// 	try {
// 		const pagesDate = req.query.postId
// 		const page = await PageModel.findOneAndUpdate(
// 			{ pageUrl: pagesDate },
// 			{ $inc: { viewsCount: 1 } },
// 			{ new: true }
// 		)
// 		res.json({ pageContent: page.pageContent })
// 	} catch (error) {
// 		console.log(error)
// 	}
// }

// export const getPagePostsTitle = async (req, res) => {
// 	try {
// 		const pagesDate = req.query
// 		//console.log(pagesDate)
// 		//console.log('increment', req.query.increment)
// 		const counter = await PageModel.find({
// 			pageType: pagesDate.typePage,
// 			pageTypePublish: true,
// 		}).count()
// 		console.log(counter)
// 		/*const pages = await PageModel.find({
// 			pageType: pagesDate.typePage,
// 			pageTypePublish: true,
// 		})
// 			.sort({ _id: -1 })
// 			.limit(req.query.increment)
// 			.exec()
// 			.then(result => {
// 				return result
// 			})
// 			.catch(err => {
// 				console.error(err)
// 			})*/
// 		const pages = await PageModel.find({
// 			pageType: pagesDate.typePage,
// 			pageTypePublish: true,
// 		})
// 			.sort({ _id: -1 })
// 			.skip(req.query.increment)
// 			.limit(3)
// 			.exec()
// 			.then(result => {
// 				return result
// 			})
// 			.catch(err => {
// 				console.error(err)
// 			})
// 		const newArr = []
// 		pages.forEach(item => {
// 			const {
// 				pageTypePublish,
// 				pageUrl,
// 				pageTitle,
// 				pageDate,
// 				pageImage,
// 				pageType,
// 			} = item
// 			newArr.push({
// 				pageUrl,
// 				pageTitle,
// 				pageDate,
// 				pageImage,
// 				pageTypePublish,
// 				pageType,
// 			})
// 		})

// 		console.log(newArr)
// 		res.json(newArr)
// 	} catch (error) {
// 		console.log(error)
// 		res.send(error)
// 	}
// }

// export const getTestsUrl = async (req, res) => {
// 	try {
// 		const pageUrl = req.query.testUrl
// 		console.log(pageUrl)
// 		const page = await PageModel.findOne({ testUrl: pageUrl })
// 		console.log(page)
// 		if (page == null) {
// 			return res.status(404).json(page._doc)
// 		} else {
// 			return res.status(200).json(page._doc)
// 		}
// 	} catch (err) {
// 		console.log(err)
// 		return res.status(404).json({
// 			message: 'Страница не на найдена',
// 		})
// 	}
// }
