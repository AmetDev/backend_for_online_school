import Test from '../models/Test.js'

export const createTest = async (req, res) => {
	try {
		const { testName, Teacher_uuid, questions } = req.body
		const test = new Test({
			testName,
			Teacher_uuid,
			questions,
		})

		await test.save()
		res.status(201).json(test)
	} catch (error) {
		res.status(500).json({ message: 'Ошибка при создании теста', error })
	}
}

export const getOneTest = async (req, res) => {
	try {
		const { id, Teacher_uuid } = req.query

		// Проверьте наличие id и Teacher_uuid в запросе
		if (!id || !Teacher_uuid) {
			return res.status(400).json({ message: 'Не указан id или Teacher_uuid' })
		}

		// Найдите тест, который соответствует указанному id и Teacher_uuid
		const test = await Test.findOne({ _id: id, Teacher_uuid })

		if (!test) {
			return res.status(404).json({ message: 'Тест не найден' })
		}

		res.status(200).json(test)
	} catch (error) {
		res.status(500).json({ message: 'Ошибка при получении теста', error })
	}
}
export const deleteTest = async (req, res) => {
	try {
		const test = await Test.findByIdAndDelete(req.query.id)
		if (!test) {
			return res.status(404).json({ message: 'Тест не найден' })
		}
		res.status(200).json({ message: 'Тест успешно удален' })
	} catch (error) {
		res.status(500).json({ message: 'Ошибка при удалении теста', error })
	}
}
export const getTests = async (req, res) => {
	try {
		const Teacher_uuid = req.query.Teacher_uuid

		const tests = await Test.find({ Teacher_uuid })
		res.status(200).json(tests)
	} catch (error) {
		res.status(500).json({ message: 'Ошибка при получении тестов', error })
	}
}
