// File path__
import "./GuideAddStories.css";
import useUserData from "../../../Hooks/useUserData";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// Package(SWRRTALAERT2)__
import Swal from "sweetalert2";

// From react__
import React, { useState } from "react";

const GuideAddStories = () => {
  const { currentUserData } = useUserData();
  const axiosSecure = useAxiosSecure();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [storiesUploadLoading, setStoriesUploadLoading] = useState(false);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const files = Array.from(event.dataTransfer.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragActive(false);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStoriesUploadLoading(true);

    const imageUploadPromises = images.map(async (image) => {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMAGE_API
          }`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        if (data.success) {
          return data.data.display_url;
        } else {
          console.error("Image upload failed:", data);
          return null;
        }
      } catch (err) {
        setStoriesUploadLoading(false);
        console.error("Image upload error:", err);
        return null;
      }
    });

    const imageURLs = await Promise.all(imageUploadPromises);
    const validImageURLs = imageURLs.filter((url) => url !== null);

    const storiesData = {
      title,
      content,
      images: validImageURLs,
      ownerName: currentUserData.userName,
      ownerEmail: currentUserData.userEmail,
    };

    const res = await axiosSecure.post("/upload-stories", storiesData);
    if (res.data.insertedId) {
      Swal.fire({
        title: "Stories uploaded successfully",
        icon: "success",
        draggable: true,
      });

      setTitle("");
      setContent("");
      setImages([]);

      window.scrollTo(0, 0);
      setStoriesUploadLoading(false);
    }
  };

  return (
    <div className="guide-add-stories">
      <div className="container">
        <div className="header">
          <h1 className="title">Add New Story</h1>
          <p className="subtitle">Share your story with the community</p>
        </div>

        <form className="story-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="story-title" className="form-label">
              Story Title
            </label>
            <input
              type="text"
              id="story-title"
              className="form-input"
              placeholder="Enter an engaging title for your story..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="story-content" className="form-label">
              Story Content
            </label>
            <textarea
              id="story-content"
              className="form-textarea"
              placeholder="Tell your story... Share your experiences, insights, and inspiration with others."
              rows="8"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Images</label>
            <div
              className={`upload-area ${dragActive ? "drag-active" : ""}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="upload-content">
                <div className="upload-icon">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                  </svg>
                </div>
                <h3>Upload Images</h3>
                <p>Drag and drop your images here, or click to browse</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                />
                <button type="button" className="browse-btn">
                  Browse Files
                </button>
              </div>
            </div>
          </div>

          {images.length > 0 && (
            <div className="image-preview">
              <h4 className="preview-title">
                Selected Images ({images.length})
              </h4>
              <div className="image-grid">
                {images.map((image, index) => (
                  <div key={index} className="image-item">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="preview-image"
                    />
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </button>
                    <div className="image-info">
                      <span className="image-name">{image.name}</span>
                      <span className="image-size">
                        {(image.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              disabled={storiesUploadLoading}
              className="btn btn-primary"
            >
              {storiesUploadLoading ? "Working on it..." : "Publish Story"}
            </button>
          </div>
          {storiesUploadLoading && (
            <span className="text-xl font-semibold text-blue-600">
              🌐 Uploading in progress... Please wait a moment!
            </span>
          )}
        </form>
      </div>
    </div>
  );
};

export default GuideAddStories;
