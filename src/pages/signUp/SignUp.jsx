import { useForm } from "react-hook-form";
import { MdKeyboardTab } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../components/SocialLogin";
import axios from "axios";
import useTheme from "../../hooks/useTheme";

function SignUp() {
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  const path = location?.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleSignUp = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then(async (result) => {
        if (result.user) {
          const userData = {
            name: data.fullName,
            email: data.email,
            photoURL: "",
            role: data.role ? data.role : "buyer",
            status: data.role === "buyer" ? "approved" : "pending",
            wishlist: [],
          };

          await axios
            .post(
              `https://beauty-luxe-server.vercel.app/user/${result.user.email}`,
              {
                userData,
              }
            )
            .then((res) => {
              console.log(res);
              if (res.data.insertedId) {
                toast.success("User created Successfully!");
                navigate(path);
              }
            });
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const { theme } = useTheme();

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-darkBackground text-textLight"
          : "bg-lightBackground text-textDark border-2"
      }`}
    >
      <div className="flex justify-around items-center gap-7 min-h-screen py-8">
        <div className="shadow-2xl p-10 rounded-md max-w-9/12 bg-background">
          <div className="md:flex justify-center ">
            {/* left side here */}
            <div className=" w-full flex items-start justify-center  ">
              <div>
                <h1 className=" text-2xl lg:text-4xl font-bold mb-4 text-center">
                  Sign Up
                </h1>
                <h1 className=" text-xl lg:text-2xl mb-4 font-semibold">
                  Connect with Social Media
                </h1>
                <div className="divider"></div>
                <SocialLogin />
                <p className="mt-5 text-center">
                  Already have an account! please{" "}
                  <NavLink to="/sign-in" className="underline font-semibold">
                    sign In
                  </NavLink>
                </p>
              </div>
            </div>

            <div className="divider md:divider-horizontal flex items-center justify-center">
              Or
            </div>

            {/* right side here */}
            <div className=" w-full max-w-sm  ">
              <h1 className=" text-xl lg:text-2xl mb-4 font-semibold">
                Connect with Email
              </h1>
              <div className="divider"></div>
              <form onSubmit={handleSubmit(handleSignUp)}>
                <div className="space-y-2">
                  <div>
                    <label>Name : </label>
                    <input
                      type="text"
                      {...register("fullName", { required: true })}
                      className={`input-style ${
                        theme === "dark" ? "bg-textDark" : "bg-lightBackground"
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <span className="text-red-500 text-sm">
                        Full Name is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label>Email : </label>
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      className={`input-style ${
                        theme === "dark" ? "bg-textDark" : "bg-lightBackground"
                      }`}
                      placeholder="Enter Your Email"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm">
                        email is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label>Role : </label>
                    <select
                      {...register("role")}
                      defaultValue="buyer"
                      className={`input-style ${
                        theme === "dark" ? "bg-textDark" : "bg-lightBackground"
                      }`}
                    >
                      <option>buyer</option>
                      <option>seller</option>
                    </select>
                  </div>
                  <div>
                    <label>Password : </label>
                    <input
                      type="password"
                      {...register("password", {
                        required: "password is required",
                        pattern: {
                          value:
                            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&#]).{8,}$/,
                          message:
                            "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character",
                        },
                      })}
                      className={`input-style ${
                        theme === "dark" ? "bg-textDark" : "bg-lightBackground"
                      }`}
                      placeholder="Enter Password"
                    />
                    {errors.password && (
                      <p style={{ color: "red" }}>{errors.password.message}</p>
                    )}
                  </div>
                  <div>
                    <label>Confirm Password : </label>
                    <input
                      type="password"
                      {...register("confirmPassword", {
                        required: "confirm password is required",
                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords do not match",
                      })}
                      className={`input-style ${
                        theme === "dark" ? "bg-textDark" : "bg-lightBackground"
                      }`}
                      placeholder="Enter Password"
                    />
                    {errors.confirmPassword && (
                      <p style={{ color: "red" }}>
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <button type="submit" className="my-btn mt-4 w-full">
                      Sign Up{" "}
                      <span>
                        <MdKeyboardTab />
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
