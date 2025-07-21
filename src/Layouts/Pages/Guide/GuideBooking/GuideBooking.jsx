import { useEffect, useState } from "react";
import "./GuideBooking.css";
import useUserData from "../../../Hooks/useUserData";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const GuideBooking = () => {
  const { currentUserData } = useUserData();
  const axiosSecure = useAxiosSecure();
  const [bookingData, setBookingData] = useState([]);
  const [booingLoading, setBooingLoading] = useState(false);

  useEffect(() => {
    if (!currentUserData?.userEmail) {
      return;
    }

    setBooingLoading(true);
    axiosSecure.get(`guide-booing/${currentUserData.userEmail}`).then((res) => {
      console.log(res.data);
      setBookingData(res.data);
      setBooingLoading(false);
    });
  }, [axiosSecure, currentUserData]);

  const handleAccept = (bookingId) => {
    console.log(`Accepted booking with ID: ${bookingId}`);
    // Add accept logic here later
  };

  const handleReject = (id) => {
    const newData = { newStatus: "Rejected" };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/reject-booking-status/${id}`, newData)
          .then((res) => {
            console.log(res.data);

            axiosSecure
              .get(`guide-booing/${currentUserData.userEmail}`)
              .then((res) => {
                setBookingData(res.data);
                if (res.data.modifiedCount) {
                  Swal.fire({
                    title: "Rejected!",
                    text: "Your booking is Rejected",
                    icon: "success",
                  });
                }
              });
          });
      }
    });
  };

  return (
    <div className="guide-booking-container">
      <div className="header">
        <h1>Assigned Tours</h1>
        <p>Manage your tour bookings and respond to tourist requests</p>
      </div>

      <div className="booking-table-wrapper">
        <table className="booking-table">
          <thead>
            <tr>
              <th>Package Name</th>
              <th>Tourist Name</th>
              <th>Tour Date</th>
              <th>Tour Price</th>
              <th>Status & Actions</th>
            </tr>
          </thead>

          <tbody>
            {booingLoading ? (
              <div className="guide-booking-loading">
                loading... please wait !
              </div>
            ) : bookingData.length === 0 ? (
              <div className="empty-state-parent-container">
                <div className="empty-state">
                  <div className="empty-icon">📅</div>
                  <h3>No bookings yet</h3>
                  <p>You don't have any assigned tours at the moment.</p>
                </div>
              </div>
            ) : (
              bookingData.map((booking) => (
                <tr key={booking._id}>
                  <td className="package-name">
                    <div className="package-info">
                      <span className="package-title">
                        {booking.packageName.length > 10
                          ? booking.packageName.slice(0, 21) + "..."
                          : booking.packageName}
                      </span>
                    </div>
                  </td>

                  <td className="tourist-name">
                    <div className="tourist-info">
                      <span className="tourist-title">
                        {booking.touristName}
                      </span>
                      <span className="tourist-email">
                        {booking.touristEmail}
                      </span>
                    </div>
                  </td>

                  <td className="tour-date">
                    <div className="date-info">
                      <span className="date-main">{booking.tourDate}</span>
                    </div>
                  </td>

                  <td className="tour-price">
                    <span
                      className={
                        booking.status === "Rejected" ? "red-price" : "price"
                      }
                    >
                      ৳{booking.packagePrice}
                    </span>
                  </td>

                  <td className="status-actions">
                    <div className="status-section">
                      <span className="status-badge pending">
                        {booking.status}
                      </span>
                    </div>

                    {booking.status !== "Rejected" && (
                      <div className="actions">
                        <button
                          disabled={booking.status === "Pending"}
                          className={
                            booking.status === "Pending"
                              ? "btn btn-accept-disable"
                              : "btn btn-accept"
                          }
                          onClick={() => handleAccept("TOUR001")}
                        >
                          Accept
                        </button>

                        <button
                          className="btn btn-reject"
                          onClick={() => handleReject(booking._id)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuideBooking;
