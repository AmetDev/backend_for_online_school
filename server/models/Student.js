import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		name_parent: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		gender: {
			type: Boolean,
			default: true,
		},
		password: {
			type: String,
			required: true,
		},
		typeUser: {
			type: String,
			required: true,
		},
		dateBirth: {
			type: Date,
			required: true,
		},
		Teacher_uuid: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Teacher',
		},
		Parent_uuid: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Parent',
		},
	},
	{ timestamps: true }
)

export default mongoose.model('Student', studentSchema)
