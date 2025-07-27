// File path__
import "./GuideManageStory.css";
import useUserData from "../../../Hooks/useUserData";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// From react__
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import StoryUpdate from "../../../Components/StoryUpdate/StoryUpdate";

const GuideManageStory = () => {
  const { currentUserData } = useUserData();
  const axiosSecure = useAxiosSecure();
  const [stories, setStories] = useState([]);
  const [storiesLoading, setStoriesLoading] = useState(false);

  useEffect(() => {
    if (!currentUserData?.userEmail) {
      return;
    }

    setStoriesLoading(true);
    axiosSecure
      .get(`/get-user-stories/${currentUserData.userEmail}`)
      .then((res) => {
        setStories(res.data);
        setStoriesLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosSecure, currentUserData]);

  const handleDeleteStory = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete-story/${id}`).then((res) => {
          if (res.data.deletedCount) {
            axiosSecure
              .get(`/get-user-stories/${currentUserData.userEmail}`)
              .then((res) => {
                setStories(res.data);
                Swal.fire({
                  title: "Deleted!",
                  text: "Your story has been deleted.",
                  icon: "success",
                });
              });
          }
        });
      }
    });
  };

  return (
    <section className="manage_story_section">
      <h1 className="manage_story_title">Manage Story</h1>

      <div>
        {storiesLoading ? (
          <div className="text-4xl text-blue-600 font-semibold text-center flex items-center justify-center w-full h-[80vh]">
            <h2>Loading story...</h2>
          </div>
        ) : stories.length === 0 ? (
          <div className="text-5xl text-blue-600 font-semibold text-center flex items-center justify-center w-full h-[80vh]">
            No Story Added
          </div>
        ) : (
          <div className="manage_story_grid">
            {stories.map((item) => (
              <div key={item._id} className="story_card">
                <img src={item.images[0]} alt="Story" className="story_image" />
                <div className="story_info">
                  <h2 className="story_title">{item.title}</h2>
                  
                  <div className="story_button_container">
                    <button>
                      <StoryUpdate item={item}></StoryUpdate>
                    </button>
                    <button
                      onClick={() => handleDeleteStory(item._id)}
                      className="delete_btn"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GuideManageStory;
