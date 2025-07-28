// File path__
import "./Payment.css";
import useUserData from "../../Hooks/useUserData";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

// Package(STRIPE, REACT ROUTER, SWEET ALERT)__
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const Payment = () => {
  const packageData = useLoaderData();
  const { currentUserData } = useUserData();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);

  const bookingId = packageData._id;
  const price = packageData?.packagePrice;

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        name: "Tourist",
        email: "tourist@example.com",
      },
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: currentUserData.userName,
            email: currentUserData.userEmail,
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        setSuccess("✅ Payment successful!");
        setError("");
        const newBookingData = {
          newStatus: "In-review",
          payment: "Completed",
        };
        axiosSecure
          .patch(`/update-booking-status/${bookingId}`, newBookingData)
          .then((res) => {
            if (res.data.modifiedCount) {
              const paymentData = {
                id: paymentIntent.id,
                amount: paymentIntent.amount,
                currency: paymentIntent.currency,
                method: paymentIntent.payment_method,
                created: paymentIntent.created,
              };
              console.log(paymentData);

              axiosSecure.post("/payment-history", paymentData).then((res) => {
                if (res.data.insertedId) {
                  navigate("/dashboard/tourist-manage-booking");

                  Swal.fire({
                    title: "Payment Successful",
                    icon: "success",
                    draggable: true,
                  });
                }
              });
            }
          });
      }
    }

    setProcessing(false);
  };

  return (
    <section id="payment_section">
      <h1>Pay to confirm you tour package!</h1>
      <div className="payment-box">
        <h2>Pay ${price}</h2>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "18px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            className="pay-btn"
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            {processing ? "Processing..." : "Pay Now"}
          </button>
        </form>

        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}
      </div>
    </section>
  );
};

export default Payment;