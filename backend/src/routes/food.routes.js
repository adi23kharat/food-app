import express from 'express'
import multer from 'multer'
import {authFoodPartnerMiddleware,authUserMiddleware} from '../middleware/auth.middleware.js'
import { createFood,getFoodItem,likeFood,saveFood,getSavedFood } from '../controller/food.controller.js'

const router = express.Router()

const upload = multer({            // to show file 
  storage:multer.memoryStorage()
})


// food add only fp ( protected)
router.post('/',authFoodPartnerMiddleware,upload.single('video'),createFood)

// food videos get method for user
router.get('/',authUserMiddleware,getFoodItem)

// likes of food
router.post('/like',authUserMiddleware,likeFood)

// Save food
router.post('/save',authUserMiddleware,saveFood)

// get save food
router.get('/save',authUserMiddleware,getSavedFood)


export default router
