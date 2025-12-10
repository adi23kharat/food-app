import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Reels from '../../components/Reels'

const Home = () => {
    const [ videos, setVideos ] = useState([])
    // Autoplay behavior is handled inside ReelFeed

    useEffect(() => {
        axios.get("http://localhost:5000/food/", { withCredentials: true })
            .then(response => {

                console.log(response.data);

                setVideos(response.data.foodItems)
            })
            .catch(() => { /* noop: optionally handle error */ })
    }, [])
    // const likeVideo = (item)=>{
    //     const response = axios.post(`http://localhost:5000/food/like/${item._id}`, {foodId:item._id}, { withCredentials: true })
    //     if(response.data.like){
    //       console.log('video liked')
    //       setVideos((prevVideos)=>
    //         prevVideos.map((video)=>
    //           video._id === item._id ? {...video, likeCount: video.likeCount + 1} : video
    //         )
    //       )
    //     }
    
    //   }


  return <Reels videos={videos} setVideos={setVideos}/>
}

export default Home
