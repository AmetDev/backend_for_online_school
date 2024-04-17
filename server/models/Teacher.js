import mongoose from 'mongoose'

const teacherSchema = new mongoose.Schema(
	{
		fullName: {
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
		dateBirth: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true }
)

export default mongoose.model('Teacher', teacherSchema)
