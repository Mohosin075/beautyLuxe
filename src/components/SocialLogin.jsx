import { MdKeyboardTab } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router";
import { useCreateUserMutation } from "../redux/api/baseApi";

function SocialLogin() {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  const path = location?.state?.from?.pathname || "/";

  const [createUser] = useCreateUserMutation();
  const handleGoogleLogin = () => {
    try {
      googleLogin()
        .then(async (result) => {
          const user = result.user;

          const userData = {
            name: user.displayName,
            email: user.email,
            photoURL: "",
            role: "buyer",
            status: "approved",
            wishlist: [],
          };

          if (result.user) {
            await createUser({
              email: result.user.email,
              body: userData,
            });
            toast.success("User Login Successfully!");
            navigate(path);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleGoogleLogin}
        type="submit"
        className="my-btn w-full"
      >
        Continue with Google
        <span>
          <MdKeyboardTab />
        </span>
      </button>
      <button
        onClick={() =>
          toast.info("This feature is't available right now! try with Google.")
        }
        type="submit"
        className="my-btn w-full"
      >
        Continue with Facebook
        <span>
          <MdKeyboardTab />
        </span>
      </button>
    </div>
  );
}

export default SocialLogin;
