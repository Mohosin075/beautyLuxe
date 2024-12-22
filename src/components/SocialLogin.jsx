import { MdKeyboardTab } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";

function SocialLogin() {
  const { googleLogin } = useAuth();

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log(result.user);
        if (result.user) {
          toast.success("User Login Successfully!");
        }
      })
      .catch((err) => {
        toast.error(err.message);

        console.log(err);
      });
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleGoogleLogin}
        type="submit"
        className="my-btn w-full text-center border-secondary-dark bg-primary-dark text-white hover:bg-purple-300 hover:text-purple-900"
      >
        Continue with Google
        <span>
          <MdKeyboardTab />
        </span>
      </button>
      <button
        onClick={() => toast.info("This feature is't available right now! try with Google.")}
        type="submit"
        className="my-btn w-full text-center bg-secondary-dark text-white hover:bg-purple-300 hover:text-purple-900"
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
