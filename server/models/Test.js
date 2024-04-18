import mongoose from 'mongoose'

const testSchema = new mongoose.Schema(
	{
		testUrl: {
			type: String,
			required: true,
		},
		name_test: {
			type: String,
			required: true,
		},

		arraysQuestion: {
			type: Array,
			required: true,
		},
		arraysImg: {
			type: Array,
			required: true,
		},
		ImgTest: {
			type: String,
			required: true,
		},

		questions_text: {
			type: String,
			required: true,
		},
		question_type: {
			type: Boolean,
			default: true,
		},
		pageTypePublish: {
			type: Boolean,
			default: false,
			required: true,
		},
		answer: {
			type: String,
			required: true,
		},

		Teacher_uuid: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Teacher',
			required: true,
		},
	},
	{ timestamps: true }
)

export default mongoose.model('Test', testSchema)
