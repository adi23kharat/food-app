import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import axios from 'axios'
import Reels from '../../components/Reels'

const Saved = () => {
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/food/save', { withCredentials: true })
            .then(response => {
                const savedFoods = (response.data.savedFoods || []).map((item) => ({
                    _id: item.food._id,
                    video: item.food.video,
                    description: item.food.description,
                    likeCount: item.food.likeCount || 0,
                    saveCount: item.food.saveCount || 0,
                    comments: item.food.comments || 0,
                    foodpartner: item.food.foodpartner || item.food.foodPartner || null,
                }))
                setVideos(savedFoods)
            })
            .catch(() => setVideos([]))
    }, [])

    return (
        <Reels videos={videos} setVideos={setVideos} />
    )
}

export default Saved