import "../AuthStyle/AuthStyle.css";
import { AuthContext } from "../../../../Provider/AuthProvider";
import SocialLogin from "../../../Components/SocialLogin/SocialLogin";

// Imported package__
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { TiHomeOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router";

// Form react__
import { use } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const { handleUserProfile, handleCreateUser, loading } = use(AuthContext);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const name = data.name;
    const photo = data.photo;
    const email = data.email;
    const password = data.password;

    handleCreateUser(email, password)
      .then(() => {
        handleUserProfile(name, photo)
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
              title: "Signed up successfully",
            });
          })
          .catch((error) => {
            console.log(error);
          });

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <section id="signup_section">
        <div className="main_auth_container">
          <div className="auth_from_parent_container">
            <div className="auth_from_content_container">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1>
                  Sign Up Now
                  <Link to="/">
                    <p className="home_button">
                      <TiHomeOutline />
                    </p>
                  </Link>
                </h1>
                <p>Create a free account</p>

                <SocialLogin></SocialLogin>

                <div className="auth_input_container">
                  <p>Name</p>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    {...register("name", { required: true })}
                  />

                  {/* handling name field error */}
                  <div>
                    {errors.name && (
                      <span className="text-sm text-red-400">
                        Name field is required
                      </span>
                    )}
                  </div>
                </div>

                <div className="auth_input_container">
                  <p>Photo URL</p>
                  <input
                    type="text"
                    name="photo"
                    placeholder="Photo URL (Optional)"
                    {...register("photo", { required: false })}
                  />
                </div>

                <div className="auth_input_container">
                  <p>What's you role</p>
                  <select
                    defaultValue="What's your role"
                  >
                    <option disabled={true}>Pick you role</option>
                    <option>Tourist</option>
                    <option>Tour Guide</option>
                  </select>
                </div>

                <div className="auth_input_container">
                  <p>Email</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    {...register("email", { required: true })}
                  />

                  {/* handling email field error */}
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
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
                    })}
                  />

                  {/* handling password field error__ST */}
                  <div>
                    {errors.password?.type === "required" && (
                      <span className="text-sm text-red-400">
                        Password is required
                      </span>
                    )}
                  </div>

                  <div>
                    {errors.password?.type === "minLength" && (
                      <span className="text-sm text-red-400">
                        Password should be at least 8 characters
                      </span>
                    )}
                  </div>

                  <div>
                    {errors.password?.type === "pattern" && (
                      <span className="text-sm text-red-400">
                        Use at least one uppercase(A-Z) and lowercase(a-z)
                        character
                      </span>
                    )}
                  </div>
                  {/* handling password field error__END */}
                </div>

                <div className="auth_input_container">
                  <p>Confirm Password</p>
                  <input
                    type="password"
                    name="confirm_password"
                    placeholder="Repeat Password"
                    {...register("confirm_password", {
                      required: true,
                      validate: (value) => {
                        if (watch("password") !== value) {
                          return "Password do not match";
                        }
                      },
                    })}
                  />
                  <div>
                    {errors.confirm_password && (
                      <span className="text-sm text-red-400">
                        Password don't match!
                      </span>
                    )}
                  </div>
                </div>

                <div className="terms_and_conditions">
                  <input
                    type="checkbox"
                    name="terms"
                    {...register("agreeTerms", { required: true })}
                  />{" "}
                  Accept our terms & conditions or else play squid same to
                  register.
                  <div>
                    {errors.agreeTerms && (
                      <span className="text-sm text-red-400">
                        Accept our terms &conditions.
                      </span>
                    )}
                  </div>
                </div>

                <button className="sign_up_button" type="submit">
                  {loading ? "Working..." : "Sign Up"}
                </button>
                <p>
                  I already have account go to{" "}
                  <u>
                    <Link to="/sign-in">sign in</Link>
                  </u>
                  !
                </p>
              </form>
              {/*  */}
            </div>
          </div>

          <div className="auth_image_container"></div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
