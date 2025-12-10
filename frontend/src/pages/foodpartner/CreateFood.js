import React, { useState, useRef } from 'react'
import axios from 'axios'
import '../../styles/createfood.css'
import { useNavigate } from 'react-router-dom'

const CreateFood = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef()
  const navigate = useNavigate()

  const onFile = (f) => {
    if (!f) return
    // revoke previous preview if present
    if (preview) URL.revokeObjectURL(preview)
    setFile(f)
    const url = URL.createObjectURL(f)
    setPreview(url)
  }

  const removeFile = () => {
    if (preview) URL.revokeObjectURL(preview)
    setFile(null)
    setPreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const f = e.dataTransfer.files && e.dataTransfer.files[0]
    if (f) onFile(f)
  }

  const handleSelect = (e) => {
    const f = e.target.files && e.target.files[0]
    if (f) onFile(f)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !file) {
      alert('Please provide a food name and a video.')
      return
    }
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('name', name)
      fd.append('description', description)
      fd.append('video', file)

      // replace URL with your API endpoint for creating food item
       await axios.post('http://localhost:5000/food/', fd,
        { withCredentials: true }
        )

      // alert('Food item created')
      setName('')
      setDescription('')
      setFile(null)
      setPreview(null)
      if (fileRef.current) fileRef.current.value = ''
      navigate('/home')
      
    } catch (err) {
      console.error(err)
      alert('Failed to create food item')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="create-food-page">
      <div className="create-card">
        <h2 className="cf-title">Create Food Item</h2>
        <p className="cf-sub">Upload a short video of the food along with basic details.</p>

        <form onSubmit={handleSubmit}>
          <div className="cf-field">
            <label className="cf-label">Food Video</label>
            <div
              className="video-drop"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileRef.current && fileRef.current.click()}
              role="button"
              tabIndex={0}
            >
              {preview ? (
                <div className="file-info" onClick={(e) => e.stopPropagation()}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <rect x="3" y="4" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M17 7v3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    <polygon points="9,9 14,12 9,15" fill="currentColor" />
                  </svg>
                  <div className="file-meta">
                    <div className="file-name">{file ? file.name : 'selected-video'}</div>
                    <div className="file-size">{file ? ((file.size||0)/1024/1024).toFixed(2) + ' MB' : ''}</div>
                  </div>
                  <button type="button" className="remove-file-inline" onClick={(e) => { e.stopPropagation(); removeFile() }} aria-label="Remove video">Remove</button>
                </div>
              ) : (
                <div className="vd-empty">
                  <svg className="vd-icon" width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.25" fill="none" />
                    <rect x="3.5" y="5.5" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
                    <rect x="3.5" y="9" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
                    <rect x="3.5" y="12.5" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
                    <rect x="3.5" y="16" width="1.5" height="1.5" rx="0.3" fill="currentColor" />
                    <polygon points="9,8 15,12 9,16" fill="currentColor" />
                  </svg>
                  <div className="vd-info">
                    <div className="vd-text">Click or drop a short video here</div>
                    <div className="vd-meta">MP4, MOV · short clips recommended</div>
                  </div>
                </div>
              )}
              <input ref={fileRef} type="file" accept="video/*" style={{display:'none'}} onChange={handleSelect} />
            </div>
          </div>

          <div className="cf-field">
            <label className="cf-label">Food Name</label>
            <input className="cf-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Butter Chicken" />
          </div>

          <div className="cf-field">
            <label className="cf-label">Description</label>
            <textarea className="cf-textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description (max 200 chars)" maxLength={200} />
          </div>

          <div className="cf-actions">
            <button className="cf-submit" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Create'}</button>
            <button type="button" className="cf-cancel" onClick={() => { setName(''); setDescription(''); setFile(null); setPreview(null); if (fileRef.current) fileRef.current.value = '' }}>Cancel</button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default CreateFood