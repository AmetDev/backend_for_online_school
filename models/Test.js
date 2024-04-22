import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema(
	{
		question: {
			type: String,
			required: true,
		},
		answers: [
			{
				image: {
					type: String,
					required: true,
				},
				isCorrect: {
					type: Boolean,
					required: true,
				},
			},
		],
	},
	{ timestamps: true }
)

const testSchema = new mongoose.Schema(
	{
		testName: {
			type: String,
			required: true,
		},
		Teacher_uuid: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Teacher',
			required: true,
		},
		questions: [questionSchema],
	},
	{ timestamps: true }
)

const Test = mongoose.model('Test', testSchema)

export default Test
