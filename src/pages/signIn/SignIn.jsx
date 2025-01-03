import { useForm } from "react-hook-form";
import { MdKeyboardTab } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../components/SocialLogin";
import useTheme from "../../hooks/useTheme";
import useUserFromDB from "../../hooks/useUserFromDB";
import { useEffect } from "react";

function SignIn() {
  const { loginUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { refetch } = useUserFromDB();

  const { user } = useAuth();

  useEffect(() => {
    refetch();
  }, [user, refetch]);

  const path = location?.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignIn = (data) => {
    loginUser(data.email, data.password)
      .then((result) => {
        if (result.user) {
          toast.success("User Login Successfully!");
          navigate(path);
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
      <div className="flex justify-around items-center gap-7  min-h-screen py-8">
        <div className={`shadow-2xl p-10 rounded-md  max-w-9/12 bg-background`}>
          <div className="md:flex justify-center ">
            {/* left side here */}
            <div className=" w-full flex items-start justify-center  ">
              <div>
                <h1 className=" text-2xl lg:text-4xl font-bold mb-4 text-center">
                  Sign In
                </h1>
                <h1 className=" text-xl lg:text-2xl mb-4 font-semibold">
                  Connect with Social Media
                </h1>
                <div className="divider"></div>
                <SocialLogin />
                <p className="mt-5 text-center">
                  new to this site! please{" "}
                  <NavLink to="/sign-up" className="underline font-semibold">
                    sign up
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
                Continue with Email
              </h1>
              <div className="divider"></div>
              <form onSubmit={handleSubmit(handleSignIn)}>
                <div className="space-y-2">
                  <div>
                    <label>Email : </label>
                    <input
                      type="text"
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
                    <label>Password : </label>
                    <input
                      type="text"
                      {...register("password", {
                        required: "password is required",
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
                    <button type="submit" className="my-btn mt-6 w-full">
                      Sign In{" "}
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

export default SignIn;
