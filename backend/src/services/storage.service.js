import imagekit from "imagekit";
import dotenv from 'dotenv'
dotenv.config()
// Cloud Storage Provider Code

const imageKit = new imagekit({
  
  publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT

})

// Upload File Code

export const uploadFile = async(file,fileName)=>{

  const result = await imageKit.upload({
    file:file, // required
    fileName:fileName  // required
  })

  return result.url // return URL of uploaded File
}