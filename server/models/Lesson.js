import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
	publishType: {
		type: Boolean,
		required: true,
	},
	page_name: {
		type: String,
		default: true,
	},
	pageContent: {
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
