import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
	name_test: {
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
	imgOrText: {
		type: String,
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
	timestamps: true,
})

export default mongoose.model('Student', studentSchema)
