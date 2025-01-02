import { MdKeyboardTab } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

function SocialLogin() {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  const path = location?.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
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
          await axios
            .post(
              `https://beauty-luxe-server.vercel.app/user/${result.user.email}`,
              {
                userData,
              }
            )
            .then((res) => {
              if (
                res.data.insertedId ||
                res.data.message === "This user Already exist!"
              ) {
                toast.success("User Login Successfully!");
                navigate(path);
              }
            });
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
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
