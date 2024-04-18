import { validationResult } from 'express-validator'
import PageModel from '../models/Page.js'
import Test from '../models/Test.js'

export const createTest = async (req, res) => {
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
			ImgTest,
			arraysQuestion,
			answer,
			arraysImg,
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
			testUrl,
			questions_text,
			question_type,
			pageTypePublish,
			ImgTest,
			arraysQuestion,
			arraysImg,
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

export const deleteTest = async (req, res) => {
	try {
		const testUrl = req.query.id
		//console.log(req)
		//console.log(pageUrl)
		const page = await Test.findByIdAndDelete(testUrl)
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
