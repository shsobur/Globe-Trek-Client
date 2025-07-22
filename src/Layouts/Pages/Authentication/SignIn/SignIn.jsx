// File path__
import "../AuthStyle/AuthStyle.css";
import { AuthContext } from "../../../../Provider/AuthProvider";
import SocialLogin from "../../../Components/SocialLogin/SocialLogin";

// Package(SWEETALEART, REACT HOOK FORM, REACT ICONS)__
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { TiHomeOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router";

// From react__
import { use, useState } from "react";

const SignIn = () => {
  const { handleLoginUser, loading } = use(AuthContext);
  const [error, serError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    handleLoginUser(email, password)
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
        serError("Invalid! user or password. Try again");
        console.log(error);
      });
  };

  return (
    <>
      <section id="signin_section">
        <div className="main_auth_container">
          <div className="auth_from_parent_container">
            <div className="auth_from_content_container">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1>
                  Sign In Now{" "}
                  <Link to="/">
                    <p className="home_button">
                      <TiHomeOutline />
                    </p>
                  </Link>
                </h1>

                <SocialLogin></SocialLogin>

                <div className="auth_input_container">
                  <p>Email</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    {...register("email", { required: true })}
                  />
                  <div>
                    {errors.email && (
                      <span className="text-sm text-red-400">
                        Email field is required
                      </span>
                    )}
                  </div>
                </div>

                <div className="auth_input_container">
                  <p>Password</p>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    {...register("password", { required: true })}
                  />

                  <div>
                    {errors.password && (
                      <span className="text-sm text-red-400">
                        Password field is required
                      </span>
                    )}
                  </div>

                  <span className="text-sm text-red-400">{error}</span>
                </div>

                <button className="sign_up_button" type="submit">
                  {loading ? "Working on it..." : "Sign In"}
                </button>
                <p>
                  I don't have account, go to{" "}
                  <u>
                    <Link to="/sign-up">sign up</Link>
                  </u>
                  !
                </p>
              </form>
            </div>
          </div>

          <div className="auth_image_container"></div>
        </div>
      </section>
    </>
  );
};

export default SignIn;