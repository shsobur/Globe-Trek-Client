// File path__
import useUserData from "../../../../Hooks/useUserData";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaExpand,
  FaChevronRight,
  FaUserCircle,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight as FaRight,
  FaTimes,
} from "react-icons/fa";

const Stories = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { currentUserData } = useUserData();
  const { user } = useContext(AuthContext);
  const [stories, setStories] = useState([]);
  const [isExpand, setIsExpand] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [storiesLoading, setStoriesLoading] = useState(false);
  const [modalImageIndexes, setModalImageIndexes] = useState({});

  useEffect(() => {
    setStoriesLoading(true);
    axiosPublic.get("/get-random-story").then((res) => {
      if (res.data) {
        setStories(res.data);
        setStoriesLoading(false);
      }
    });
  }, [axiosPublic]);

  const handleReadMore = (idx) => {
    setActiveIndex(idx);
    setIsExpand(!isExpand);
  };

  const handleLikeCount = async (value, idx, id) => {
    if (!user) {
      navigate("/sign-in");
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: "You have to login first",
      });
      return;
    }

    const newValue = value + 1;
    const likeCountData = {
      like: newValue,
      likedBy: currentUserData.userEmail,
    };

    await axiosPublic
      .patch(`/update-stories/${id}`, likeCountData)
      .then((res) => {
        if (res.data.result.modifiedCount) {
          axiosPublic.get("/all-stories").then((res) => {
            setStories(res.data);
          });
        }
      });
  };

  const openModal = (storyId, imageIndex = 0) => {
    setModalImageIndexes((prev) => ({
      ...prev,
      [storyId]: imageIndex,
    }));

    const modal = document.getElementById(`stories_image_modal_${storyId}`);
    if (modal) {
      modal.showModal();
    }
  };

  const nextImage = (storyId) => {
    const story = stories.find((s) => s._id === storyId);
    if (story && story.images.length > 1) {
      setModalImageIndexes((prev) => ({
        ...prev,
        [storyId]:
          (prev[storyId] || 0) === story.images.length - 1
            ? 0
            : (prev[storyId] || 0) + 1,
      }));
    }
  };

  const prevImage = (storyId) => {
    const story = stories.find((s) => s._id === storyId);
    if (story && story.images.length > 1) {
      setModalImageIndexes((prev) => ({
        ...prev,
        [storyId]:
          (prev[storyId] || 0) === 0
            ? story.images.length - 1
            : (prev[storyId] || 0) - 1,
      }));
    }
  };

  const setImageIndex = (storyId, index) => {
    setModalImageIndexes((prev) => ({
      ...prev,
      [storyId]: index,
    }));
  };

  const getCurrentImageIndex = (storyId) => {
    return modalImageIndexes[storyId] || 0;
  };

  return (
    <>
      <section
        id="stories_section"
        className="bg-[#f8fbff] py-12 md:py-20 lg:py-24"
      >
        <div className="max-w-[1536px] min-h-[100vh] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div
            className="text-center mb-12 md:mb-16 lg:mb-20"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2c5282] mb-4">
              Tourist{" "}
              <span className="font-playfair text-[#87ceeb]">Stories</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#87ceeb] to-[#b8e6ff] mx-auto rounded-full"></div>
            <p className="text-lg sm:text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
              Discover authentic travel experiences shared by our community of
              adventurers
            </p>
          </div>

          {/* Stories Grid */}
          <div data-aos="fade-up" data-aos-duration="1200" data-aos-once="true">
            {storiesLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#0060af] mb-4"></div>
                <span className="text-2xl text-[#0060af] font-semibold">
                  Loading Stories...
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-5">
                {stories.map((story, index) => (
                  <div
                    key={story._id}
                    className="bg-white cursor-pointer rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100 overflow-hidden"
                  >
                    {/* Story Image */}
                    <div className="relative group">
                      <img
                        src={story.images[0]}
                        alt="Story"
                        className="w-full h-48 sm:h-56 object-cover cursor-pointer"
                      />
                      <div
                        onClick={() => openModal(story._id, 0)}
                        className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
                      >
                        <FaExpand className="text-white text-2xl" />
                      </div>
                    </div>

                    {/* Story Content */}
                    <div className="p-3">
                      {/* Story Meta */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <FaUserCircle className="text-[#87ceeb]" />
                          <span>{story.author || "Traveler"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="text-[#87ceeb]" />
                          <span>
                            {new Date(story?.date).toLocaleDateString() ||
                              "Recently"}
                          </span>
                        </div>
                      </div>

                      {/* Story Title */}
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {story?.title.length !== 44
                          ? story.title.slice(0, 45) + "..."
                          : story?.title}
                      </h2>

                      {/* Story Content */}
                      <article className="text-gray-600 leading-relaxed mb-4">
                        {activeIndex === index && isExpand
                          ? story.content
                          : story.content.slice(0, 110) + "..."}
                      </article>

                      {/* Read More Button */}
                      {story.content.length > 120 && (
                        <button
                          onClick={() => handleReadMore(index)}
                          className="text-[#0060af] font-semibold hover:text-[#87ceeb] transition-colors duration-300 flex items-center gap-1 mb-4"
                        >
                          {activeIndex === index && isExpand
                            ? "Read Less"
                            : "Read More"}
                          <FaChevronRight
                            className={`text-sm transition-transform duration-300 ${
                              activeIndex === index && isExpand
                                ? "rotate-90"
                                : ""
                            }`}
                          />
                        </button>
                      )}

                      {/* Like Button */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <button
                          onClick={() =>
                            handleLikeCount(story.like || 0, index, story._id)
                          }
                          disabled={story.likedBy?.includes(
                            currentUserData?.userEmail
                          )}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                            story.likedBy?.includes(currentUserData?.userEmail)
                              ? "text-red-500 bg-red-50"
                              : "text-gray-500 hover:text-red-500 hover:bg-red-50"
                          }`}
                        >
                          {story.likedBy?.includes(
                            currentUserData?.userEmail
                          ) ? (
                            <FaHeart className="text-red-500" />
                          ) : (
                            <FaRegHeart />
                          )}
                          <span className="font-semibold">
                            {story.like === undefined ? 43 : story.like}
                          </span>
                        </button>

                        <span className="text-sm text-gray-500">
                          {Math.ceil(story.content.length / 200)} min read
                        </span>
                      </div>
                    </div>

                    {/* INDIVIDUAL MODAL FOR EACH STORY - Using YOUR working approach */}
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
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border-none text-gray-700 hover:bg-white hover:text-[#0060af] transition-all duration-300 shadow-lg z-50"
                              >
                                <FaChevronLeft />
                              </button>
                              <button
                                onClick={() => nextImage(story._id)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border-none text-gray-700 hover:bg-white hover:text-[#0060af] transition-all duration-300 shadow-lg z-50"
                              >
                                <FaRight />
                              </button>
                            </>
                          )}

                          {/* Current Image */}
                          <div className="flex justify-center items-center h-[60vh] p-8">
                            <img
                              src={
                                story.images[getCurrentImageIndex(story._id)]
                              }
                              alt={`Story image ${
                                getCurrentImageIndex(story._id) + 1
                              }`}
                              className="max-w-full h-[45vh] object-contain rounded-lg"
                            />
                          </div>

                          {/* Image Indicators */}
                          {story.images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
                              {story.images.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={() =>
                                    setImageIndex(story._id, index)
                                  }
                                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === getCurrentImageIndex(story._id)
                                      ? "bg-[#0060af]"
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

            {/* View More Button */}
            <div
              className="text-center mt-12 md:mt-16"
              data-aos="fade-up"
              data-aos-duration="1400"
              data-aos-once="true"
            >
              <Link to={"/community"}>
                <button className="bg-gradient-to-r from-[#0060af] to-[#87ceeb] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                  View More Stories
                  <FaChevronRight className="text-sm" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Stories;