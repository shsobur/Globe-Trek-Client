import "./SocialLogin.css";
import { AuthContext } from "../../../Provider/AuthProvider";

// Imported package__
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";

// From react__
import { use } from "react";

const SocialLogin = () => {
  const { handleGoogleSignIn } = use(AuthContext);
  const navigate = useNavigate();

  // Handle google login__
  const handleGooglAuth = () => {
    handleGoogleSignIn()
      .then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <section id="social_login_section">
        <button
          onClick={handleGooglAuth}
          type="button"
          className="google_button"
        >
          <ul>
            <li>
              <FcGoogle />
            </li>
            <li>Sign in with Google</li>
          </ul>
        </button>

        <div className="divider">
          <span></span>
          <p>OR</p>
          <span></span>
        </div>
      </section>
    </>
  );
};

export default SocialLogin;