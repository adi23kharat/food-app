import foodModel from "../models/food.model.js";
import likeModel from "../models/like.model.js";
import saveModel from "../models/save.model.js";
import { uploadFile } from "../services/storage.service.js";
import { v4 as uuidv4 } from 'uuid';

export const createFood = async(req,res)=>{

  // console.log(req.foodpartner)

  // console.log(req.body)
  // console.log(req.file)  // returns file buffer

  const fileUploadResult = await uploadFile(req.file.buffer,uuidv4())
  
  const foodItem = await foodModel.create({
    name:req.body.name,
    video:fileUploadResult,
    description : req.body.description,
    foodpartner : req.foodpartner._id
  })
  res.status(201).json({
    message: 'Food created Successfully',
    food:foodItem 
  })
  
}
export const getFoodItem = async(req,res)=>{
  
  const foodItems = await foodModel.find({})  // return all food Items

  res.status(201).json({
    message : 'Food Items Fetched SuccessFully !!',
    foodItems
  })

}

export const likeFood = async(req,res)=>{
  // console.log(req.body)
  const {foodId} = req.body
  // console.log(req.user)
  const user = req.user

  const isAlreadyLike = await likeModel.findOne({
    user: user._id,
    food:foodId
  })

  if(isAlreadyLike){
    await likeModel.deleteOne({
      user:user._id,
      food:foodId
    })
    await foodModel.findByIdAndUpdate(foodId,
      {$inc:{likeCount: - 1}},
      {new:true}
    )
    return res.status(200).json({
      message:'Food Unliked Successfully!!'
    })
  }

  const like = await likeModel.create({
    user:user._id,
    food:foodId
  })
  await foodModel.findByIdAndUpdate(
  foodId,
  { $inc: { likeCount: 1 } },
  { new: true }
);
  res.status(201).json({
    message:"Food Like successfully",
    like
  })

}
export const saveFood = async(req,res)=>{
  const {foodId} = req.body
  const user = req.user 
  // check if already saved
  const isAlreadySaved = await saveModel.findOne({
    user:user._id,
    food:foodId
  })  
  if(isAlreadySaved){
    await saveModel.deleteOne({
      user:user._id,  
      food:foodId
    })
    await foodModel.findByIdAndUpdate(foodId,
      {$inc:{saveCount: - 1}},
      {new:true}
    )
    return res.status(200).json({
      message:'Food Unsaved Successfully!!'
    })
  }     

  const save = await saveModel.create({
    user:user._id,
    food:foodId
  })
  await foodModel.findByIdAndUpdate(
    foodId,
    { $inc: { saveCount: 1 } },
    { new: true }
  );
  res.status(201).json({
    message:"Food Saved successfully",
    save
  })
} 
export const getSavedFood = async(req,res)=>{
  const user = req.user

  const savedFoods = await saveModel.find({user:user._id}).populate('food')   
  // const foods = savedFoods.map((item)=> item.food)
  res.status(200).json({
    message:'Saved foods fetched successfully',
    savedFoods
  })
} 

// export const getUserLikes = async (req, res) => {
//   const user = req.user
//   const likes = await likeModel.find({ user: user._id }).select('food -_id')
//   // normalize to string ids
//   const likedIds = likes.map((l) => l.food.toString())
//   return res.status(200).json({ likedIds })
// }