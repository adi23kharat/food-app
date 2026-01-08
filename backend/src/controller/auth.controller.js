import userModel from '../models/user.model.js'
import foodPartnerModel from '../models/foodpartner.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser = async(req,res)=>{

  const {fullname ,email ,password} = req.body
  console.log(req.body)
  const isUserAlreadyExists = await userModel.findOne({email})

  if(isUserAlreadyExists){
    return res.status(400).json({
      message:"User is already Exists"
    })
  }
  
  const hashPassword = await bcrypt.hash(password,10)

  const user = await userModel.create({
    fullname,
    email,
    password:hashPassword
  })

  const token = jwt.sign({ id:user._id },process.env.JWT_SECRET)
  
  res.cookie('token',token)
  res.status(201).json({
    message:"User register Succeessfully!!!",
    user:{
      _id : user._id,
      fullname : user.fullname,
      email : user.email
    }
  })
}
export const loginUser = async(req,res)=>{
  console.log(req.body)
  const {email,password} = req.body
  // console.log(email)

  const user = await userModel.findOne({email})
  if(!user){
    res.status(401).json({
      message:"Invalid email,password"
    })
  } 
  console.log(user)
  const isPasswordValid =  bcrypt.compare(password,user.password)
  if(!isPasswordValid){
    res.status(401).json({
      message:"Invalid email,password"
    })
  }

  const token =  jwt.sign({ _id : user._id},process.env.JWT_SECRET)
  res.cookie('token',token)

  res.status(201).json({
    message:"User logined SuccessFully!!!",
    user:{
      id:user._id,
      fullname:user.fullname,
      email:user.email,
    }
  })
}
export const logoutUser = (req,res)=>{
  res.clearCookie("token")
  res.status(200).json({
    message: " User logout Successfully!!!"
  })
}



export const registerFoodPartner = async(req,res)=>{

  const {name ,email ,password} = req.body
  const isfpAlreadyExists = await foodPartnerModel.findOne({email})

  if(isfpAlreadyExists){
    return res.status(400).json({
      message:"Food Partner is already Exists"
    })
  }
  
  const hashPassword = await bcrypt.hash(password,10)

  const foodpartner = await foodPartnerModel.create({
    name,
    email,
    password:hashPassword
  })

  const token = jwt.sign({ id:foodpartner._id },process.env.JWT_SECRET)
  
  res.cookie("token", token, {
  httpOnly: true,
  secure: true, 
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000
});

  res.status(201).json({
    message:"Foodpartner register Succeessfully!!!",
    foodpartner:{
      _id : foodpartner._id,
      fullname : foodpartner.fullname,
      email : foodpartner.email
    }
  })
}

export const loginFoodPartner = async(req,res)=>{

  const {email,password} = req.body

  const foodpartner = await foodPartnerModel.findOne({email})
  if(!foodpartner){
    res.status(401).json({
      message:"Invalid login"
    })
  }
  const isPasswordValid = await bcrypt.compare(password,foodpartner.password)
  if(!isPasswordValid){
    res.status(401).json({
      message:'Invalid login'
    })
  }

  const token = jwt.sign({id : foodpartner._id}, process.env.JWT_SECRET)
  res.cookie('token',token)
  
  res.status(200).json({
    message: 'FoodPartner login Successfully',
    foodpartner:{
      id:foodpartner._id,
      name:foodpartner.name,
      email:foodpartner.email
    }
  })






}
export const logoutFoodPartner = async(req,res)=>{
  res.clearCookie('token')
  res.status(200).json({
    message: "FoodPartner Logout Successfully!!!"
  })
}


