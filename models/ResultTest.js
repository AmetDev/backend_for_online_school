import mongoose from 'mongoose'

const questionResultSchema = new mongoose.Schema(
	{
		questionId: {
			type: String,
			required: true,
		},
		isCorrect: {
			type: Boolean,
			required: true,
		},
	},
	{ timestamps: true }
)
const testResultSchema = new mongoose.Schema(
	{
		correctAnswers: {
			type: Number,
			required: true,
		},
		test_name: {
			type: String,
			required: true,
		},
		totalQuestions: {
			type: Number,
			required: true,
		},
		result: [questionResultSchema],
		Test_uuid: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Test',
			required: true,
		},
		Student_uuid: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Student',
			required: true,
		},
	},
	{ timestamps: true }
)

export default mongoose.model('ResultTest', testResultSchema)
