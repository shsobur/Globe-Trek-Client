// File path__
import "./StoryUpdate.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

import Swal from "sweetalert2";
import { useState } from "react";

const StoryUpdate = ({ item }) => {
  const axiosSecure = useAxiosSecure();
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);
  const [images, setImages] = useState(item.images || []);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleDeleteImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  const handleUpdate = async () => {
    const updateData = {};

    if (title !== item.title) updateData.title = title;
    if (content !== item.content) updateData.content = content;
    if (JSON.stringify(images) !== JSON.stringify(item.images)) {
      updateData.images = images;
    }

    if (Object.keys(updateData).length === 0) return;

    setUpdateLoading(true);
    try {
      const res = await axiosSecure.patch(
        `/update-story/${item._id}`,
        updateData
      );
      if (res.data.modifiedCount) {
        setUpdateLoading(false);
        document.getElementById(`close_btn_${item._id}`).click();
        Swal.fire({
          title: "Story updated successfully!",
          icon: "success",
        });
      }
    } catch (error) {
      setUpdateLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      {/* Open Modal Button */}
      <button
        onClick={() =>
          document.getElementById(`story_update_modal_${item._id}`).showModal()
        }
        className="story_update_bnt"
      >
        Update
      </button>

      {/* Modal */}
      <dialog id={`story_update_modal_${item._id}`} className="modal">
        <div className="modal-box w-full max-w-2xl">
          <form method="dialog">
            <button
              id={`close_btn_${item._id}`}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>

          <div className="space-y-4">
            <h2 className="text-3xl text-blue-600 font-semibold text-center mb-10">
              Update Story
            </h2>

            {/* Title */}
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Content */}
            <div>
              <label className="block mb-1 font-medium">Content</label>
              <textarea
                rows="10"
                className="textarea textarea-bordered w-full"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* Existing Images */}
            <div>
              <label className="block mb-2 font-medium">Images</label>
              {images.length === 0 ? (
                <p className="text-gray-500 text-sm">No images left.</p>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Story ${index}`}
                        className="w-full h-32 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-80 hover:opacity-100"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <button
                type="button"
                disabled={updateLoading}
                onClick={handleUpdate}
                className="btn bg-blue-600 hover:bg-blue-700 text-white"
              >
                {updateLoading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default StoryUpdate;