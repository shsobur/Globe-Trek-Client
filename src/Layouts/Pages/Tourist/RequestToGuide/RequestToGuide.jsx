// File path__
import "./RequestToGuide.css";
import useUserData from "../../../Hooks/useUserData";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// Package(SWEET ALERT)__
import Swal from "sweetalert2";

// From react__
import { useState } from "react";

const RequestToGuide = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUserData } = useUserData();
  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      requestTitle: title,
      reasonForRequest: reason,
      createdAt: new Date().toISOString(),
      applierEmail: currentUserData.userEmail,
      applierName: currentUserData.userName,
    };

    axiosSecure.post("/add-guide-request", requestData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Guide request successful",
          text: "Your application will be reviewed within 7 days. Please wait for the admin's response.",
          icon: "success",
          draggable: true,
        });

        setTitle("");
        setReason("");
      }
    });
  };

  return (
    <section className="request_guide_section">
      <div className="request_guide_container">
        <h1 className="request_guide_heading">Request to Become a Guide</h1>

        <form className="request_guide_form" onSubmit={handleSubmit}>
          <div className="form_group">
            <label htmlFor="title">Request Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your request title"
              required
            />
          </div>

          <div className="form_group">
            <label htmlFor="reason">Why do you want to be a guide?</label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Write your reason here..."
              rows="15"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit_btn">
            Submit Request
          </button>
        </form>
      </div>
    </section>
  );
};

export default RequestToGuide;