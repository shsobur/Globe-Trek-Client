// File path__
import "./Candidates.css";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ScrollToTop from "../../../Components/ScrollToTop/ScrollToTop";

// Package(SWEET ALERT)__
import Swal from "sweetalert2";

// From react__
import { useEffect, useState } from "react";

const Candidates = () => {
  const axiosSecure = useAxiosSecure();
  const [requestData, setRequestData] = useState([]);
  const [requestLoading, setRequestLoading] = useState(false);

  useEffect(() => {
    setRequestLoading(true);
    axiosSecure.get("/get-all-guide-request").then((res) => {
      if (res.data) {
        setRequestData(res.data);
        setRequestLoading(false);
      }
    });
  }, [axiosSecure]);

  const handleAccept = (email, id) => {
    const newRole = { role: "Tour Guide" };

    Swal.fire({
      title: "Are you sure?",
      text: "You want to make the use tole into Tour Guide?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/update-use-role/${email}`, newRole).then((res) => {
          if (res.data.modifiedCount) {
            axiosSecure.delete(`/delete-guide-request/${id}`).then((res) => {
              if (res.data.deletedCount) {
                axiosSecure.get("/get-all-guide-request").then((res) => {
                  if (res.data) {
                    setRequestData(res.data);
                    Swal.fire({
                      title: "Successful",
                      text: "User role is now Tour Guide",
                      icon: "success",
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject the request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete-guide-request/${id}`).then((res) => {
          if (res.data.deletedCount) {
            axiosSecure.get("/get-all-guide-request").then((res) => {
              if (res.data) {
                setRequestData(res.data);
                Swal.fire({
                  title: "Rejected!",
                  text: "This request is rejected",
                  icon: "success",
                });
              }
            });
          }
        });
      }
    });
  };

  return (
    <>
      <ScrollToTop></ScrollToTop>
      <div className="manage-candidates">
        <h2>Manage Candidates</h2>
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Requested Role</th>
              <th>Actions</th>
              <th>Message</th>
            </tr>
          </thead>

          <tbody>
            {requestLoading ? (
              "Data is loading..."
            ) : requestData.length === 0 ? (
              "No request available"
            ) : (
              <>
                {requestData.map((data) => (
                  <tr key={data._id}>
                    <td>{data.applierName}</td>

                    <td>{data.applierEmail}</td>

                    <td>{data.currentRole}</td>

                    <td>Guide</td>

                    <td>
                      <button
                        onClick={() =>
                          handleAccept(data.applierEmail, data._id)
                        }
                        className="accept"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(data._id)}
                        className="reject"
                      >
                        Reject
                      </button>
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          document.getElementById("request_modal").showModal()
                        }
                        className="details"
                      >
                        Details
                      </button>
                    </td>

                    {/* Request modal__ST */}

                    <dialog id="request_modal" className="modal">
                      <div className="modal-box max-w-2xl bg-white p-6 rounded-lg shadow-lg border border-blue-200">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute left-[880px] top-1 text-gray-500 hover:text-red-500">
                            ✕
                          </button>
                        </form>

                        <h3 className="text-xl font-semibold text-[#2a75b3] mb-4">
                          {data.requestTitle}
                        </h3>

                        <div className="space-y-3 text-gray-700 leading-relaxed">
                          {data.reasonForRequest}
                        </div>

                        <div className="mt-6 text-right text-sm text-gray-500">
                          Submitted on:{" "}
                          <span className="font-medium">{data.createdAt}</span>
                        </div>
                      </div>
                    </dialog>

                    {/* Request modal__END */}
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Candidates;