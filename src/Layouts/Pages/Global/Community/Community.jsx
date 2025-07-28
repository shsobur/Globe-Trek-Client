// File path__
import "./Community.css";
import useUserData from "../../../Hooks/useUserData";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../../Provider/AuthProvider";

// Package(SWEET ALERT, REACT ROUTER, REACT ICONS, REACT SHEAR)__
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { VscShare } from "react-icons/vsc";
import { FacebookShareButton } from "react-share";

// From react__
import { useContext, useEffect, useState } from "react";

// React Share__

const Community = () => {
  const { user } = useContext(AuthContext);
  const { currentUserData } = useUserData();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [isExpand, setIsExpand] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [storiesLoading, setStoriesLoading] = useState(false);

  useEffect(() => {
    setStoriesLoading(true);
    axiosPublic.get("/all-stories").then((res) => {
      setStories(res.data);
      setStoriesLoading(false);
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

  return (
    <>
      <section id="community_section">
        <div className="main_community_container">
          <h1 className="community_title">Explore Our Community</h1>

          {storiesLoading ? (
            <div className="h-[80vh] w-full m-auto flex gap-2 items-center justify-center">
              <span className="text-4xl text-[#0060af] font-semibold">
                Loading stories...
              </span>
              <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-[#0060af]"></div>
            </div>
          ) : (
            <div className="main_stories_card_container">
              {stories.map((story, index) => (
                <div key={story._id} className="stories_card">
                  <h1>{story.title}</h1>

                  <article>
                    {activeIndex === index && isExpand
                      ? story.content
                      : story.content.slice(0, 120) + "..."}
                  </article>

                  {story.content.length > 120 && (
                    <button
                      onClick={() => handleReadMore(index)}
                      className="text-blue-500 underline mt-2"
                    >
                      {activeIndex === index && isExpand
                        ? "Read Less"
                        : "Read More"}
                    </button>
                  )}

                  <div className="stories_card_image_container">
                    <img
                      onClick={() =>
                        document
                          .getElementById(`stories_image_modal${story._id}`)
                          .showModal()
                      }
                      src={story.images[0]}
                      alt="Card Image"
                    />
                  </div>

                  <div className="stories_like_container">
                    <span className="flex justify-between items-center">
                      <button
                        onClick={() =>
                          handleLikeCount(story.like, index, story._id)
                        }
                        disabled={story.likedBy?.includes(
                          currentUserData?.userEmail
                        )}
                      >
                        {story.like === undefined ? 43 : story?.like}
                        {story.likedBy?.includes(currentUserData?.userEmail)
                          ? "💖"
                          : "🤍"}
                      </button>

                      {/* Facebook Share Button */}
                      <FacebookShareButton
                        url={window.location.href}
                        quote={story.title}
                      >
                        <VscShare className="text-xl text-[#0060af] cursor-pointer" />
                      </FacebookShareButton>
                    </span>
                  </div>

                  {/* Modal ST */}
                  <div className="image_modal_parent_container">
                    <dialog
                      id={`stories_image_modal${story._id}`}
                      className="modal"
                    >
                      <div className="modal-box">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute left-[910px]">
                            ✕
                          </button>
                        </form>

                        <div className="stories_image_all_container">
                          {story.images.map((img) => (
                            <img key={img} src={img} alt="Image" />
                          ))}
                        </div>
                      </div>
                    </dialog>
                  </div>
                  {/* Modal END */}
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
