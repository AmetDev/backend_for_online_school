import ResultTest from '../models/ResultTest.js'

export const setResultTest = async (req, res) => {
	try {
		const { correctAnswers, totalQuestions, test_uuid, results, test_name } =
			req.body
		const { userId } = req
		console.log(correctAnswers, totalQuestions, test_uuid, results)
		// Create an array of question results
		const questionResults = results.map(result => ({
			questionId: result.questionId,
			isCorrect: result.isCorrect,
		}))
		console.log('questionResults', test_name)

		// Create a new test result document
		const newResult = new ResultTest({
			correctAnswers,
			totalQuestions,
			Student_uuid: userId,
			Test_uuid: test_uuid,
			result: questionResults,
			test_name: test_name,
		})

		// Save the document to the database
		await newResult.save()

		// Send a success response
		res
			.status(201)
			.json({ message: 'Result saved successfully', result: newResult })
	} catch (error) {
		console.error('Error saving result:', error)
		// Send an error response
		res.status(500).json({ message: 'Failed to save result', error })
	}
}
export const getResultByUUIDs = async (req, res) => {
	try {
		const { test_uuid } = req.query
		const { userId } = req
		// Find test result by test_uuid and student_uuid
		const result = await ResultTest.findOne({
			Test_uuid: test_uuid,
			Student_uuid: userId,
		})

		if (!result) {
			return res.status(404).json({ message: 'Result not found' })
		}

		// Send the test result
		res.status(200).json({ result })
	} catch (error) {
		console.error('Error getting result:', error)
		// Send an error response
		res.status(500).json({ message: 'Failed to get result', error })
	}
}
