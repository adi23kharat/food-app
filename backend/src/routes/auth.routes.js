import express from 'express'
import { registerUser ,loginUser,logoutUser ,registerFoodPartner,loginFoodPartner,logoutFoodPartner} from '../controller/auth.controller.js'
const router = express.Router()

router.post('/user/register',registerUser)
router.post('/user/login',loginUser)
router.get('/user/logout',logoutUser)

router.post('/foodpartner/register',registerFoodPartner)
router.post('/foodpartner/login',loginFoodPartner)
router.get('/foodpartner/logout',logoutFoodPartner)


export default router