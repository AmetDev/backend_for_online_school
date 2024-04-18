import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'
import morgan from 'morgan'
import multer from 'multer'
import path from 'path'
import Image from './models/Image.js'
import pdfModel from './models/PdfFile.js'
import pageRouter from './routes/PageRoutes.js'

import routerParent from './routes/ParentRouter.js'
import StudentRouter from './routes/StudentRouter.js'
import TeacherRouter from './routes/TeacherRouter.js'
import routerTest from './routes/TestRouter.js'
import checkAuth from './utils/checkAuth.js'

dotenv.config({ path: './.env' })
const app = express()

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

console.log(MONGO_URI)

app.use(express.json({ limit: '50mb' }))
app.use(cors())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json({ limit: '200mb' }))
app.use(
	bodyParser.urlencoded({
		limit: '200mb',
		extended: true,
		parameterLimit: 1000000,
	})
)

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/') // Uploads will be stored in the 'uploads' directory
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname))
	},
})

const upload = multer({ storage: storage })

// Serve the HTML page with a form for image upload
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'))
})
app.post(
	'/uploadpdf',
	checkAuth,

	upload.single('file'),
	async (req, res) => {
		try {
			if (req.file) {
				const pdfUrl = `/uploads/${req.file.filename}`

				// Save PDF file details to MongoDB

				const newPdf = new pdfModel({
					filename: req.file.filename,
					path: pdfUrl,
				})

				await newPdf.save()

				res.json({ pdflink: pdfUrl }) // Only return the PDF file URL
			} else {
				res.status(400).send('No PDF file provided')
			}
		} catch (error) {
			console.error(error)
			res.status(500).send('Internal Server Error')
		}
	}
)
// Handle image upload
app.post(
	'/upload',
	checkAuth,

	upload.single('image'),
	async (req, res) => {
		try {
			if (req.file) {
				const imageUrl = `/uploads/${req.file.filename}`
				const newImage = new Image({
					filename: req.file.filename,
					path: imageUrl,
				})

				await newImage.save()

				res.json({ imagelink: imageUrl }) // Only return the image URL
			} else {
				res.status(400).send('No image file provided')
			}
		} catch (error) {
			console.error(error)
			res.status(500).send('Internal Server Error')
		}
	}
)

// Set up static file serving for uploaded images
app.use('/uploads', express.static('uploads'))
/* ROUTES */
app.use('/auth_parent', routerParent)
app.use('/auth_student', StudentRouter)
app.use('/auth_teacher', TeacherRouter)
app.use('/testing', routerTest)
app.use('/page', pageRouter)

const client = new MongoClient(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

/* START FUNCTION */
async function start() {
	try {
		await mongoose
			.connect(MONGO_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => console.log('Mongo db connected successfully'))
			.catch(err => console.log(err))

		app.listen(PORT, err => {
			if (err) return console.log('App crashed: ', err)
			console.log(`Server started successfully! Port: ${PORT}`)
		})
	} catch (err) {
		console.log(err)
	}
}

start()
