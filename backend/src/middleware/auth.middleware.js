import foodPartnerModel from "../models/foodpartner.model.js";
import jwt from 'jsonwebtoken'
import userModel from "../models/user.model.js";

export const authFoodPartnerMiddleware = async(req,res,next)=>{

  // checking is there any token 
  const token = req.cookies.token;
  if(!token){
    return res.status(404).json({
      message:"Please login first"
    })
  }

  try{
    // checking token is correct
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const foodpartner = await foodPartnerModel.findOne({id:decoded._id})
    
    req.foodpartner = foodpartner
    next()  // logic send back to the controller

  }catch(err){
    return res.status(401).json({
      message:"invalid access"
    })
  }
}

export const authUserMiddleware = async(req,res,next)=>{
  const token = req.cookies.token;
  if(!token){
    return res.status(404).json({
      message:'Please login first'
    })
  }

  try{
      const decoded = jwt.verify(token,process.env.JWT_SECRET)

      // console.log(decoded)
      // console.log(decoded.id)
      // console.log(decoded._id)

      const user = await userModel.findById(decoded.id || decoded._id)  // findbyid
      // console.log(user)
      req.user = user
      next()
  }
  catch(err){
    return res.status(404).json({
      message:'Invalid access'      
    })
  }

}
