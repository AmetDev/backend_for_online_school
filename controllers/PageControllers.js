import PageModel from '../models/Page.js'

export const updateImagePage = async (req, res) => {
	try {
		console.log('true')
		const { pageUrl, pageImageUrl, isUpdatedImage } = req.body
		console.log(pageUrl, pageImageUrl)
		const updateImagesPage = await PageModel.findOneAndUpdate(
			{ pageUrl },
			isUpdatedImage && { pageImage: pageImageUrl }
		)
		console.log('9u', updateImagesPage)
		return res.status(200).json({ updateImagesPage })
	} catch (error) {
		return res.status(500).json({ message: 'ошибка сервера' })
	}
}
export const deletePageImage = async (req, res) => {
	try {
		console.log('true')
		const { pageUrl } = req.body
		console.log(pageUrl)
		const updateImagesPage = await PageModel.findOneAndUpdate(
			{ pageUrl },
			{ pageImage: '' }
		)
		console.log('9u', updateImagesPage)
		return res.status(200).json({ updateImagesPage })
	} catch (error) {
		return res.status(500).json({ message: 'ошибка сервера' })
	}
}
export const createPage = async (req, res) => {
	try {
		// const errors = validationResult(req)

		// if (!errors.isEmpty()) {
		// 	return res.status(400).json({ message: errors.array() })
		// }
		// console.log('hello world')

		const {
			typePage,
			URLPage,
			pageTypePublish,
			pageDate,
			pageImage,
			titlePage,
			Teacher_uuid,
		} = req.body

		const existingPage = await PageModel.findOne({ pageUrl: URLPage })
		if (existingPage) {
			return res
				.status(400)
				.json({ message: 'Адрес страницы должен быть уникален' })
		}

		// const findId = await Teacher.findOne({ email: 'amet1@gmail.com' })
		// console.log('fined', findId)

		const newPage = new PageModel({
			pageUrl: URLPage,
			pageType: typePage,
			pageTypePublish: false,
			pageContent: '',
			pageImage: pageImage,
			pageDate: pageDate,
			pageTitle: titlePage,
			Teacher_uuid: Teacher_uuid,
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
export const getPages = async (req, res) => {
	try {
		const result = await PageModel.find({
			Teacher_uuid: req.query.Teacher_uuid,
		})
			.sort({ _id: -1 })

			.exec()
			.then(result => {
				return result
			})
			.catch(err => {
				console.error(err)
			})
		return res.status(200).json({ result })
	} catch (error) {
		return res.status(500).json({ message: 'ошибка сервера' })
	}
}
export const getPagesForStudent = async (req, res) => {
	try {
		console.log('req.query.increment', req.query.increment)
		const result = await PageModel.find({
			Teacher_uuid: req.query.Teacher_uuid,
		})
			.sort({ _id: -1 })

			.exec()
			.then(result => {
				return result
			})
			.catch(err => {
				console.error(err)
			})
		return res.status(200).json({ result })
	} catch (error) {
		return res.status(500).json({ message: 'ошибка сервера' })
	}
}
export const getOnePage = async (req, res) => {
	try {
		const { url } = req.query

		console.log('fdfsdfsdfs', req.query)

		const result = await PageModel.findOne({
			pageUrl: url,
			Teacher_uuid: req.query.Teacher_uuid,
		})
		if (result == null) {
			return res.status(404).json({ message: 'объект не был найден' })
		} else {
			console.log(result)
			return res.status(200).json({ result })
		}
	} catch (error) {
		return res.status(500).json({ message: 'ошибка сервера' })
	}
}

export const getOurCollegePages = async (req, res) => {
	try {
		const arrPages = await PageModel.find()
		console.log(arrPages)
		res.send(arrPages)
	} catch (error) {
		console.log(error)
	}
}
export const getOurCollegePagesOne = async (req, res) => {
	try {
		const { pageUrl } = req.query
		const arrPages = await PageModel.findOne({ pageUrl, pageType: 'own' })

		if (null == arrPages) {
			return res.status(404).json({ message: 'Не удалось найти страницу' })
		}
		res.send(arrPages)
	} catch (error) {
		console.log(error)
		res.send(error)
	}
}

export const getOurPostsPages = async (req, res) => {
	try {
		const { increment } = req.body

		const arrPages = await PageModel.find({
			pageType: 'post',
			pageTypePublish: true,
		})
			.sort({ _id: -1 })
			.limit(3)

		res.send(arrPages)
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'произошла ошибка при получении страниц' })
	}
}

export const updatePageAndToPublic = async (req, res) => {
	try {
		const ID = await PageModel.find({ pageUrl: req.body.URLPage })
		//const ID_Obj = { _id: ID[0]._id }
		console.log('req.body.URLPage', req.body.URLPage)

		const update = req.body.textValue

		const doc = await PageModel.findOneAndUpdate(
			{ pageUrl: req.body.URLPage },
			{
				pageContent: update,
				pageTypePublish: true,
				Teacher_uuid: req.userId,
			}
		)

		const doc1 = await PageModel.find({ pageUrl: req.body.URLPage })
		res.status(200).json({
			message: 'Страница успешно опубликована!',
			data: doc1,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Failed to add page',
		})
	}
}

export const getPage = async (req, res) => {
	try {
		const pageUrl = req.query.url
		console.log('pageUrl', pageUrl)
		const doc = await PageModel.findOne({ pageUrl })

		if (!doc) {
			return res.status(404).json({
				message: 'Страница не найдена',
			})
		}

		res.status(200).json(doc)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Failed to find page',
		})
	}
}

export const deletePage = async (req, res) => {
	try {
		const pageUrl = req.query.id

		console.log('pageUrl', pageUrl)
		const page = await PageModel.findOneAndRemove(pageUrl)
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
			message: 'Failed to delete page',
		})
	}
}

export const getPageContent = async (req, res) => {
	try {
		const pagesDate = req.query.postId
		const page = await PageModel.findOne({ pageUrl: pagesDate })
		res.json({ pageContent: page.pageContent })
	} catch (error) {
		console.log(error)
	}
}

export const getPagePostsTitle = async (req, res) => {
	try {
		const pagesDate = req.query
		//console.log(pagesDate)
		//console.log('increment', req.query.increment)
		const counter = await PageModel.find({
			pageType: pagesDate.typePage,
			pageTypePublish: true,
		}).count()
		console.log(counter)
		/*const pages = await PageModel.find({
			pageType: pagesDate.typePage,
			pageTypePublish: true,
		})
			.sort({ _id: -1 })
			.limit(req.query.increment)
			.exec()
			.then(result => {
				return result
			})
			.catch(err => {
				console.error(err)
			})*/
		const pages = await PageModel.find({
			pageType: pagesDate.typePage,
			pageTypePublish: true,
		})
			.sort({ _id: -1 })
			.skip(req.query.increment)
			.limit(3)
			.exec()
			.then(result => {
				return result
			})
			.catch(err => {
				console.error(err)
			})
		const newArr = []
		pages.forEach(item => {
			const {
				pageTypePublish,
				pageUrl,
				pageTitle,
				pageDate,
				pageImage,
				pageType,
			} = item
			newArr.push({
				pageUrl,
				pageTitle,
				pageDate,
				pageImage,
				pageTypePublish,
				pageType,
			})
		})

		console.log(newArr)
		res.json(newArr)
	} catch (error) {
		console.log(error)
		res.send(error)
	}
}

export const getPageUrl = async (req, res) => {
	try {
		const pageUrl = req.query.urlPage
		console.log(pageUrl)
		const page = await PageModel.findOne({ pageUrl: pageUrl })
		console.log(page)
		if (page == null) {
			return res.status(404).json(page._doc)
		} else {
			return res.status(200).json(page._doc)
		}
	} catch (err) {
		console.log(err)
		return res.status(404).json({
			message: 'Страница не на найдена',
		})
	}
}
