import { useForm } from "react-hook-form";
import { MdKeyboardTab } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../components/SocialLogin";
import useUserFromDB from "../../hooks/useUserFromDB";

function SignIn() {
  const { loginUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {loadStatus, setLoadStatus} = useUserFromDB()

  const path = location?.state?.from?.pathname || '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignIn = (data) => {
    loginUser(data.email, data.password)
      .then((result) => {
        if (result.user) {
          setLoadStatus(!loadStatus)
          toast.success("User Login Successfully!");
          window.location.reload()
          navigate(path);
        }
        console.log(result.user);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div>
      <div className="flex justify-around items-center gap-7 bg-primary-light min-h-screen py-8">
        <div className="shadow-2xl p-10 rounded-md bg-primary-light max-w-9/12">
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
                  <NavLink
                    to="/sign-up"
                    className="text-secondary-dark underline font-semibold"
                  >
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
                      className="px-2 py-1 w-full border-b-4 outline-none border-t border-l border-r rounded-md border-primary-dark text-lg bg-purple-200"
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
                      className="px-2 py-1 w-full border-b-4 outline-none border-t border-l border-r rounded-md border-primary-dark text-lg bg-purple-200"
                      placeholder="Enter Password"
                    />
                    {errors.password && (
                      <p style={{ color: "red" }}>{errors.password.message}</p>
                    )}
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="my-btn mt-8 w-full text-center bg-primary-dark text-white hover:bg-purple-300 hover:text-purple-900"
                    >
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
