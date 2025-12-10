import foodPartnerModel from "../models/foodpartner.model.js"
import foodModel from '../models/food.model.js'

export const getfoodPartnerById = async(req,res)=>{
  
  const foodPartnerId = req.params.id;

  const foodpartner = await foodPartnerModel.findById(foodPartnerId)
  const foodItemsByFp = await foodModel.find({foodpartner:foodpartner})

 
  if(!foodpartner){
    return res.status(400).json({
      message:'food partner not found'
    })
  }
  res.status(200).json({
    message : 'food Partner Fetched Successfully!!!',
    foodpartner:{
      ...foodpartner.toObject(),
      foodItems:foodItemsByFp
    }
    
  })

}