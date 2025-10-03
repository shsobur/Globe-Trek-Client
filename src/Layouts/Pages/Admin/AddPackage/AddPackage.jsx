// File path__
import "./AddPackage.css";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// Package(SWEET ALERT)__
import Swal from "sweetalert2";

// From react__
import { useState } from "react";
import ScrollToTop from "../../../Components/ScrollToTop/ScrollToTop";

const AddPackage = () => {
  const axiosSecure = useAxiosSecure();
  const [packageLoading, setPackageLoading] = useState(false);
  const [formData, setFormData] = useState({
    tourType: "",
    title: "",
    price: "",
    location: "",
    duration: "",
    images: [],
    overview: "",
    tourPlan: [{ day: "", plan: "" }],
  });
  const [uploading, setUploading] = useState(false);
  const apiKey = import.meta.env.VITE_IMAGE_API;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlanChange = (index, field, value) => {
    const updatedPlans = [...formData.tourPlan];
    updatedPlans[index][field] = value;
    setFormData((prev) => ({ ...prev, tourPlan: updatedPlans }));
  };

  const addTourPlanField = () => {
    setFormData((prev) => ({
      ...prev,
      tourPlan: [...prev.tourPlan, { day: "", plan: "" }],
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);
    try {
      const uploadedURLs = [];
      for (const file of files) {
        const formDataImg = new FormData();
        formDataImg.append("image", file);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          {
            method: "POST",
            body: formDataImg,
          }
        );
        const data = await response.json();
        if (data.success) {
          uploadedURLs.push(data.data.url);
        } else {
          alert("Image upload failed: " + data.error.message);
        }
      }
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedURLs],
      }));
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading images. Please try again.");
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      price: Number(formData.price),
      createdAt: new Date().toISOString(),
    };
    console.log("Final Tour Package:", finalData);

    try {
      setPackageLoading(true);
      const res = await axiosSecure.post("/add-tour-package", finalData);
      if (res.data.insertedId) {
        setPackageLoading(false);
        Swal.fire({
          title: "Package Added Successfully",
          icon: "success",
          draggable: true,
        });
      }

      window.location.reload();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to add package",
        icon: "error",
        draggable: true,
      });
    }
  };

  return (
    <>
      <ScrollToTop></ScrollToTop>
      <div className="add-package__container">
        {/* Header Section - Matching Our Design Pattern */}
        <div className="add-package__header">
          <h1 className="add-package__title">
            Create{" "}
            <span className="add-package__title-accent font-playfair">
              Tour Package
            </span>
          </h1>
          <div className="add-package__title-underline"></div>
          <p className="add-package__subtitle">
            Fill in the details to create an amazing tour package for your
            clients
          </p>
        </div>

        <form className="add-package__form" onSubmit={handleSubmit}>
          {/* Basic Information Section */}
          <div className="add-package__section">
            <h3 className="add-package__section-title">Basic Information</h3>
            <div className="add-package__grid">
              {["tourType", "title", "price", "location", "duration"].map(
                (field, idx) => (
                  <div className="add-package__form-group" key={idx}>
                    <label className="add-package__label">
                      {field.charAt(0).toUpperCase() +
                        field.slice(1).replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type={field === "price" ? "number" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="add-package__input"
                      placeholder={`Enter ${field
                        .replace(/([A-Z])/g, " $1")
                        .toLowerCase()}`}
                      required
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Overview Section */}
          <div className="add-package__section">
            <h3 className="add-package__section-title">Package Overview</h3>
            <div className="add-package__form-group">
              <label className="add-package__label">Overview</label>
              <textarea
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                className="add-package__textarea"
                placeholder="Describe the tour package in detail..."
                rows="4"
                required
              />
            </div>
          </div>

          {/* Images Section */}
          <div className="add-package__section">
            <h3 className="add-package__section-title">Package Images</h3>
            <div className="add-package__form-group">
              <label className="add-package__label">Upload Images</label>
              <div className="add-package__file-upload">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="add-package__file-input"
                  disabled={uploading}
                />
                <div className="add-package__file-label">
                  {uploading ? "Uploading..." : "Choose images"}
                </div>
              </div>
              {uploading && (
                <div className="add-package__upload-status">
                  <div className="add-package__spinner"></div>
                  <span>Uploading images...</span>
                </div>
              )}
              {formData.images.length > 0 && (
                <div className="add-package__image-previews">
                  <p className="add-package__image-count">
                    {formData.images.length} image(s) uploaded
                  </p>
                  <div className="add-package__image-grid">
                    {formData.images.map((url, index) => (
                      <div key={index} className="add-package__image-preview">
                        <img
                          src={url}
                          alt={`preview-${index}`}
                          className="add-package__preview-img"
                        />
                        <div className="add-package__image-overlay">
                          <span>{index + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tour Plan Section */}
          <div className="add-package__section">
            <h3 className="add-package__section-title">Tour Plan</h3>
            <div className="add-package__form-group">
              <label className="add-package__label">Daily Itinerary</label>
              <div className="add-package__tour-plan">
                {formData.tourPlan.map((item, index) => (
                  <div key={index} className="add-package__plan-day">
                    <div className="add-package__plan-header">
                      <span className="add-package__day-number">
                        Day {index + 1}
                      </span>
                    </div>
                    <div className="add-package__plan-inputs">
                      <input
                        type="text"
                        placeholder="Day title (e.g., Arrival in Dhaka)"
                        value={item.day}
                        onChange={(e) =>
                          handlePlanChange(index, "day", e.target.value)
                        }
                        className="add-package__input"
                      />
                      <textarea
                        placeholder="Detailed plan description..."
                        value={item.plan}
                        onChange={(e) =>
                          handlePlanChange(index, "plan", e.target.value)
                        }
                        className="add-package__textarea"
                        rows="3"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTourPlanField}
                  className="add-package__add-day-btn"
                >
                  <span>+</span>
                  Add Another Day
                </button>
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="add-package__submit-section">
            <button
              type="submit"
              className="add-package__submit-btn"
              disabled={uploading || packageLoading}
            >
              {packageLoading ? (
                <div className="add-package__loading">
                  <div className="add-package__btn-spinner"></div>
                  Creating Package...
                </div>
              ) : (
                "Create Tour Package"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddPackage;
