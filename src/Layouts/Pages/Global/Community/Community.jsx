import "./Community.css";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Community = () => {
  const axiosPublic = useAxiosPublic();
  const [stories, setStories] = useState([]);
  console.log(stories);

  useEffect(() => {
    axiosPublic.get("/all-stories")
    .then((res) => {
      setStories(res.data);
    });
  }, [axiosPublic]);

  return (
    <>
      <section>
        <div>Hello this is Community page!!!!</div>
      </section>
    </>
  );
};

export default Community;
