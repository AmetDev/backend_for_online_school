import express from 'express'
import { ParentController } from '../controllers/index.js'
import checkAuth from '../utils/checkAuth.js'
import {
	loginParentValidation,
	registerParentValidation,
} from '../validation/ParentValidation/ParentValidation.js'
const routerParent = express.Router()

routerParent.post(
	'/register',
	registerParentValidation,
	ParentController.createParent
)
routerParent.post('/login', loginParentValidation, ParentController.loginParent)
routerParent.get('/me', checkAuth, ParentController.getParent)
export default routerParent
