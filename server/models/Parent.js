import mongoose from 'mongoose'

const parentSchema = new mongoose.Schema(
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

		student_uuid: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Student',
		},
	},
	{ timestamps: true }
)

export default mongoose.model('Parent', parentSchema)
