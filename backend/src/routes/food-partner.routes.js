import express from 'express'
import { authUserMiddleware } from '../middleware/auth.middleware.js'
import { getfoodPartnerById } from '../controller/foodpartner.controller.js'
const router = express.Router()


// get method with authmiddleware to fetch foodpartner data

router.get('/:id',authUserMiddleware,getfoodPartnerById)

export default router