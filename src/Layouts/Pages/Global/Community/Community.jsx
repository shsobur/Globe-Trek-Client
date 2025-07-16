import { useState } from "react";
import "./Community.css";
import { useEffect } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Community = () => {
  const axiosPublic = useAxiosPublic();
  const [stories, setStories] = useState([]);
  const [likeCount, setLikeCount] = useState(false);
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

  const handleLikeCount = () => {
    setLikeCount(!likeCount);
  };

  const handleReadMore = (idx) => {
    setActiveIndex(idx);
    setIsExpand(!isExpand);
  };

  return (
    <>
      <section id="community_section">
        <div className="main_community_container">
          <h1 className="community_title">Explore Our Community</h1>

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
                  <img src={story.images[1]} alt="Card Image" />
                </div>

                <div className="stories_like_container">
                  <span onClick={handleLikeCount}>
                    {likeCount ? "💖" : " 🤍"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Community;
