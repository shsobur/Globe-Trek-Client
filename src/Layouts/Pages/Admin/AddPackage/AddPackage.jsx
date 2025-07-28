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
      <form className="form_wrapper" onSubmit={handleSubmit}>
        <h2 className="form_title">Create Tour Package</h2>

        {["tourType", "title", "price", "location", "duration", "overview"].map(
          (field, idx) => (
            <div className="form_row" key={idx}>
              <label className="form_label">
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="form_input"
              />
            </div>
          )
        )}

        <div className="form_row">
          <label className="form_label">Upload Images:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="form_input"
            disabled={uploading}
          />
          {uploading && (
            <small style={{ color: "#2a75b3", marginTop: "6px" }}>
              Uploading images...
            </small>
          )}
          {formData.images.length > 0 && (
            <div className="image_preview_wrapper">
              {formData.images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`preview-${index}`}
                  className="image_preview"
                />
              ))}
            </div>
          )}
        </div>

        <div className="form_row">
          <label className="form_label">Tour Plan:</label>
          <div className="form_input">
            {formData.tourPlan.map((item, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Day"
                  value={item.day}
                  onChange={(e) =>
                    handlePlanChange(index, "day", e.target.value)
                  }
                  className="form_input"
                />
                <input
                  type="text"
                  placeholder="Plan Description"
                  value={item.plan}
                  onChange={(e) =>
                    handlePlanChange(index, "plan", e.target.value)
                  }
                  className="form_input"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addTourPlanField}
              className="form_button"
              style={{ marginTop: "10px" }}
            >
              + Add Day
            </button>
          </div>
        </div>

        <div className="form_row submit_row">
          <button
            type="submit"
            className="form_button"
            disabled={uploading || packageLoading}
          >
            {packageLoading ? (
              <div className="flex items-center justify-center gap-2">
                <p className="font-semibold">Working...</p>
                <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin text-white"></div>
              </div>
            ) : (
              "Submit Package"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddPackage;