import React, { useRef, useEffect } from 'react'
import '../styles/reels.css'
import { useNavigate,Link } from 'react-router-dom'
import BookmarkIcon from './BookmarkIcon'
import LogoutButton from './LogoutButton'
import axios from 'axios'


const Reels = ({ videos = [],setVideos }) => {
  const containerRef = useRef(null)
  
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const vids = Array.from(container.querySelectorAll('video'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
           const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => { /* ignore autoplay errors */ })
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.6 }
    )

    vids.forEach((v) => observer.observe(v))
    return () => observer.disconnect()
  }, [videos])

  const saveVideo = async(item)=>{

    const response = await axios.post(`http://localhost:5000/food/save/`, {foodId:item._id}, { withCredentials: true })
    // console.log(response.data)
    if(response.data.save){
      // console.log('video saved')
      setVideos((prevVideos)=>
        prevVideos.map((video)=>
          video._id === item._id ? {...video, saveCount: video.saveCount + 1} : video
        )
      )
    } else{
      setVideos((prevVideos)=>
        prevVideos.map((video)=>
          video._id === item._id ? {...video, saveCount: video.saveCount - 1} : video
        )
      ) 
    }    
  }
  const likeVideo = async(item)=>{

    const response = await axios.post(`http://localhost:5000/food/like/`, {foodId:item._id}, { withCredentials: true })
    // console.log(response.data)
    
    if(response.data.like){
      // console.log('video liked')
      // highlight=true
      setVideos((prevVideos)=>
        prevVideos.map((video)=>(
          video._id === item._id ? {...video, likeCount: (video.likeCount || 0) + 1, isLiked: true} : video
        ))
      )
    }else{
      // highlight=false
      setVideos((prevVideos)=>
        prevVideos.map((video)=>(
          video._id === item._id ? {...video, likeCount: Math.max(0, (video.likeCount || 1) - 1), isLiked: false} : video
        ))
      )
    }

  }
  
 
  
  return (

    <div className="reels-container" ref={containerRef}>
      {videos.map((item) => (
        <section className="reel" key={item._id}>
          <video
            className="reel-video"
            src={item.src||item.video || item}
            loop
            muted
            playsInline
            preload="metadata"
            webkit-playsinline="true"
          />
        
          <div className="reel-overlay">
            <div className="reel-description" title={item.description || ''}>
              {item.description || 'Delicious food from our partner. Tap Visit Store to learn more.'}
            </div>
            <button className="visit-store">
              <Link to={`/food-partner/${item.foodpartner}`}> Visit Store</Link>
            </button>
          </div>
          {/* <div className={`action ${item.likeCount > 0 ? 'highlight' : ''}` } onClick={() => {likeVideo(item)}}></div> */}
          <div className="reel-actions">
            <div className={`action ${item.isLiked ? 'highlight' : ''}` } onClick={() => {likeVideo(item)}}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M20.8 7.2a5.6 5.6 0 0 0-7.9 0L12 8.1l-0.9-0.9a5.6 5.6 0 1 0-7.9 7.9L12 21.9l8.8-8.8a5.6 5.6 0 0 0 0-7.9z"/></svg>
              <div className="count"  >{item.likeCount || 0}</div>
            </div>

            <div className={`action ${item.saves > 0 ? 'highlight' : ''}`} onClick={()=>saveVideo(item)}>
              <BookmarkIcon className="bookmark-icon" width={28} height={28} />
              <div className="count">{item.saveCount || 0}</div>
            </div>

            <div className={`action ${item.comments > 0 ? 'highlight' : ''}`}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 15a2 2 0 0 1-2 2H8l-5 3V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <div className="count">{item.comments || 0}</div>
            </div>
          </div>
        </section>
      ))}

      <div className="bottom-divider" />
      <nav className="bottom-nav">
        <Link to="/home" className="nav-item">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z" stroke="currentColor" strokeWidth="1.2"/></svg>
          <span>home</span>
        </Link>

        <Link to="/saved" className="nav-item">
          <BookmarkIcon className="saved-icon" width={20} height={20} />
          <span>saved</span>
        </Link>

        <LogoutButton />
      </nav>
    </div>
  )
}

export default Reels
