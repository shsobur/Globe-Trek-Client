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
      text: "You want to make the user role into Tour Guide?",
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
      <div className="candidates__container">
        {/* Header Section - Matching Our Design Pattern */}
        <div className="candidates__header">
          <h1 className="candidates__title">
            Manage <span className="candidates__title-accent">Candidates</span>
          </h1>
          <div className="candidates__title-underline"></div>
          <p className="candidates__subtitle">
            Review and manage tour guide role requests from users
          </p>
        </div>

        {/* Candidates Table */}
        <div className="candidates__table-container">
          <table className="candidates__table">
            <thead className="candidates__table-header">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Current Role</th>
                <th>Requested Role</th>
                <th>Actions</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody className="candidates__table-body">
              {requestData.length > 0 ? (
                requestData.map((data) => (
                  <tr key={data._id} className="candidates__table-row">
                    <td className="candidates__user-name">
                      {data.applierName}
                    </td>
                    <td className="candidates__user-email">
                      {data.applierEmail}
                    </td>
                    <td>
                      <span
                        className={`candidates__role-badge candidates__role-${data.currentRole
                          ?.toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {data.currentRole}
                      </span>
                    </td>
                    <td>
                      <span className="candidates__requested-role">
                        Tour Guide
                      </span>
                    </td>
                    <td>
                      <div className="candidates__actions">
                        <button
                          onClick={() =>
                            handleAccept(data.applierEmail, data._id)
                          }
                          className="candidates__accept-btn"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(data._id)}
                          className="candidates__reject-btn"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          document
                            .getElementById(`request_modal_${data._id}`)
                            .showModal()
                        }
                        className="candidates__details-btn"
                      >
                        View Details
                      </button>
                    </td>

                    {/* DaisyUI Modal for Request Details */}
                    <dialog id={`request_modal_${data._id}`} className="modal">
                      <div className="modal-box max-w-2xl max-h-[80vh] overflow-y-auto">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute -right-[580px] top-2">
                            ✕
                          </button>
                        </form>

                        <h3 className="font-bold text-xl text-[#2c5282] mb-4">
                          {data.requestTitle}
                        </h3>

                        <div className="prose max-w-none">
                          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                              {data.reasonForRequest}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mt-6">
                            <div>
                              <span className="font-semibold">Applicant:</span>
                              <p>{data.applierName}</p>
                            </div>
                            <div>
                              <span className="font-semibold">Email:</span>
                              <p>{data.applierEmail}</p>
                            </div>
                            <div>
                              <span className="font-semibold">
                                Current Role:
                              </span>
                              <p>{data.currentRole}</p>
                            </div>
                            <div>
                              <span className="font-semibold">
                                Requested Role:
                              </span>
                              <p>Tour Guide</p>
                            </div>
                          </div>

                          {data.createdAt && (
                            <div className="mt-6 pt-4 border-t border-gray-200">
                              <p className="text-sm text-gray-500">
                                Submitted on:{" "}
                                <span className="font-medium">
                                  {data.createdAt}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn btn-ghost">Close</button>
                          </form>
                        </div>
                      </div>

                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                  </tr>
                ))
              ) : (
                <tr className="candidates__empty-row">
                  <td colSpan="6">
                    <div className="candidates__empty-state">
                      {requestLoading ? (
                        <div className="candidates__loading">
                          <div className="candidates__loading-spinner"></div>
                          <p>Loading candidate requests...</p>
                          <span>Please wait while we fetch the data</span>
                        </div>
                      ) : (
                        <div className="candidates__no-requests">
                          <div className="candidates__no-requests-icon">📋</div>
                          <p>No pending requests</p>
                          <span>
                            All tour guide requests have been processed
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Candidates;
