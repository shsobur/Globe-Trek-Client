import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import "./StoryUpdate.css";
import { useState } from "react";

const StoryUpdate = ({ item }) => {
  const axiosSecure = useAxiosSecure();
  const [title, setTitle] = useState(item.title);
  const [content, setContent] = useState(item.content);
  const [images, setImages] = useState(item.images || []);
  const [updateLoading, setUpdateLoading] = useState(false);

  const initialTitle = item.title;
  const initialContent = item.content;
  const initialImages = item.images || [];

  const handleDeleteImage = async (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  const handleUpdate = async () => {
    const updateData = {};

    if (title !== initialTitle) updateData.title = title;
    if (content !== initialContent) updateData.content = content;
    if (JSON.stringify(images) !== JSON.stringify(initialImages)) {
      updateData.images = images;
    }

    if (Object.keys(updateData).length === 0) {
      return;
    }

    setUpdateLoading(true);
    await axiosSecure.patch(`/update-story/${item._id}`, updateData).then((res) => {
      if (res.data.modifiedCount) {
        setUpdateLoading(false);
        document.getElementById("close_btn").click();
        Swal.fire({
          title: "Story Update successful",
          icon: "success",
          draggable: true,
        });
      } else
        (error) => {
          setUpdateLoading(false);
          console.log(error);
        };
    });
  };

  return (
    <div>
      <button
        onClick={() =>
          document.getElementById("story_update_modal").showModal()
        }
        className="story_update_bnt"
      >
        Update
      </button>

      <dialog id="story_update_modal" className="modal">
        <div className="modal-box w-full max-w-2xl">
          <form method="dialog">
            <button
              id="close_btn"
              className="btn btn-sm btn-circle btn-ghost absolute left-[450px]"
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
                defaultValue={initialTitle}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Content */}
            <div>
              <label className="block mb-1 font-medium">Content</label>
              <textarea
                rows="15"
                className="textarea textarea-bordered w-full"
                defaultValue={initialContent}
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
    </div>
  );
};

export default StoryUpdate;
