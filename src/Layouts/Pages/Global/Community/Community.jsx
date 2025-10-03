// File path__
import useUserData from "../../../Hooks/useUserData";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../../Provider/AuthProvider";
import ScrollToTop from "../../../Components/ScrollToTop/ScrollToTop";

// Package__
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { VscShare } from "react-icons/vsc";
import { FacebookShareButton } from "react-share";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

// From react__
import { useContext, useEffect, useState } from "react";

const Community = () => {
  const { user } = useContext(AuthContext);
  const { currentUserData } = useUserData();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [expandedStories, setExpandedStories] = useState({});
  const [storiesLoading, setStoriesLoading] = useState(false);
  const [imageIndices, setImageIndices] = useState({});

  useEffect(() => {
    setStoriesLoading(true);
    axiosPublic.get("/all-stories").then((res) => {
      setStories(res.data);
      setStoriesLoading(false);
    });
  }, [axiosPublic]);

  const handleReadMore = (storyId) => {
    setExpandedStories((prev) => ({
      ...prev,
      [storyId]: !prev[storyId],
    }));
  };

  const handleLikeCount = async (story) => {
    if (!user) {
      navigate("/sign-in");
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "You have to login first",
      });
      return;
    }

    if (story.likedBy?.includes(currentUserData?.userEmail)) {
      return; // Already liked
    }

    const newValue = (story.like || 0) + 1;
    const likeCountData = {
      like: newValue,
      likedBy: [...(story.likedBy || []), currentUserData.userEmail],
    };

    await axiosPublic
      .patch(`/update-stories/${story._id}`, likeCountData)
      .then((res) => {
        if (res.data.result.modifiedCount) {
          setStories((prev) =>
            prev.map((s) =>
              s._id === story._id
                ? { ...s, like: newValue, likedBy: likeCountData.likedBy }
                : s
            )
          );
        }
      });
  };

  // Modal image navigation functions
  const nextImage = (storyId) => {
    setImageIndices((prev) => ({
      ...prev,
      [storyId]:
        ((prev[storyId] || 0) + 1) %
        stories.find((s) => s._id === storyId)?.images.length,
    }));
  };

  const prevImage = (storyId) => {
    const story = stories.find((s) => s._id === storyId);
    setImageIndices((prev) => ({
      ...prev,
      [storyId]:
        ((prev[storyId] || 0) - 1 + story.images.length) % story.images.length,
    }));
  };

  const setImageIndex = (storyId, index) => {
    setImageIndices((prev) => ({
      ...prev,
      [storyId]: index,
    }));
  };

  const getCurrentImageIndex = (storyId) => {
    return imageIndices[storyId] || 0;
  };

  return (
    <>
      <ScrollToTop />
      <section id="community_section" className="bg-[#f8fbff] mt-[67px] py-5">
        <div className="max-w-[1536px] min-h-[100vh] mx-auto sm:px-[10px] lg:px-2">
          {/* Header Section */}
          <div className="text-center mb-16 md:mb-24 lg:mb-20 lg:mt-10">
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2c5282] mb-5">
              Explore Our{" "}
              <span className="font-playfair text-[#87ceeb]">Community</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#87ceeb] to-[#b8e6ff] mx-auto rounded-full"></div>
          </div>

          {storiesLoading ? (
            <div className="h-96 w-full flex flex-col gap-4 items-center justify-center">
              <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#2c5282]"></div>
              <span className="text-2xl text-[#2c5282] font-semibold">
                Loading stories...
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {stories.map((story) => (
                <div
                  key={story._id}
                  className="group bg-white rounded-2xl border border-[#e2f4ff] hover:border-[#87ceeb] shadow-sm hover:shadow-[0_10px_30px_rgba(135,206,235,0.15)] transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                >
                  {/* Image Section - EVERY CARD CAN OPEN MODAL */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={story.images[0]}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onClick={() => {
                        setImageIndices((prev) => ({
                          ...prev,
                          [story._id]: 0,
                        }));
                        document
                          .getElementById(`stories_image_modal_${story._id}`)
                          .showModal();
                      }}
                    />

                    {/* Image Count Badge */}
                    {story.images.length > 1 && (
                      <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                        +{story.images.length - 1}
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2c5282] mb-3 line-clamp-2 group-hover:text-[#87ceeb] transition-colors duration-300">
                      {story.title}
                    </h3>

                    <div className="text-[#4a5568] mb-4">
                      <p
                        className={`leading-relaxed text-sm ${
                          expandedStories[story._id] ? "" : "line-clamp-3"
                        }`}
                      >
                        {story.content}
                      </p>
                      {story.content.length > 120 && (
                        <button
                          onClick={() => handleReadMore(story._id)}
                          className="text-[#87ceeb] font-medium hover:text-[#2c5282] transition-colors duration-300 mt-2 text-sm"
                        >
                          {expandedStories[story._id]
                            ? "Read Less"
                            : "Read More"}
                        </button>
                      )}
                    </div>

                    {/* Actions Section */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#e2f4ff]">
                      <button
                        onClick={() => handleLikeCount(story)}
                        disabled={story.likedBy?.includes(
                          currentUserData?.userEmail
                        )}
                        className={`flex items-center gap-2 transition-all duration-300 ${
                          story.likedBy?.includes(currentUserData?.userEmail)
                            ? "text-red-500"
                            : "text-[#87ceeb] hover:text-red-500"
                        }`}
                      >
                        {story.likedBy?.includes(currentUserData?.userEmail) ? (
                          <FaHeart className="text-lg" />
                        ) : (
                          <FaRegHeart className="text-lg" />
                        )}
                        <span className="font-medium text-sm">
                          {story.like || 0}
                        </span>
                      </button>

                      <FacebookShareButton
                        url={window.location.href}
                        quote={`Check out this story: ${story.title}`}
                        className="flex items-center gap-2 text-[#87ceeb] hover:text-[#2c5282] transition-colors duration-300"
                      >
                        <VscShare className="text-lg" />
                      </FacebookShareButton>
                    </div>
                  </div>

                  {/* Bottom Border */}
                  <div className="w-12 h-1 bg-gradient-to-r from-[#87ceeb] to-[#b8e6ff] rounded-full mx-auto mb-4 transition-all duration-300 group-hover:w-16"></div>

                  {/* Modal - AVAILABLE FOR EVERY CARD */}
                  <dialog
                    id={`stories_image_modal_${story._id}`}
                    className="modal"
                  >
                    <div className="modal-box max-w-4xl lg:max-w-6xl p-0 bg-white rounded-2xl overflow-hidden">
                      <div className="relative">
                        {/* Close Button */}
                        <form
                          method="dialog"
                          className="absolute top-4 right-4 z-50"
                        >
                          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border-none text-gray-700 hover:bg-white hover:text-red-500 transition-all duration-300 shadow-lg">
                            <FaTimes />
                          </button>
                        </form>

                        {/* Navigation Arrows */}
                        {story.images.length > 1 && (
                          <>
                            <button
                              onClick={() => prevImage(story._id)}
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border-none text-gray-700 hover:bg-white hover:text-[#2c5282] transition-all duration-300 shadow-lg z-50"
                            >
                              <FaChevronLeft />
                            </button>
                            <button
                              onClick={() => nextImage(story._id)}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border-none text-gray-700 hover:bg-white hover:text-[#2c5282] transition-all duration-300 shadow-lg z-50"
                            >
                              <FaChevronRight />
                            </button>
                          </>
                        )}

                        {/* Current Image */}
                        <div className="flex justify-center items-center h-[60vh] p-8">
                          <img
                            src={story.images[getCurrentImageIndex(story._id)]}
                            alt={`Story image ${
                              getCurrentImageIndex(story._id) + 1
                            }`}
                            className="max-w-full max-h-full object-contain rounded-lg"
                          />
                        </div>

                        {/* Image Indicators */}
                        {story.images.length > 1 && (
                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
                            {story.images.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setImageIndex(story._id, index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                  index === getCurrentImageIndex(story._id)
                                    ? "bg-[#2c5282]"
                                    : "bg-white/70 hover:bg-white"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Backdrop Click to Close */}
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Community;
