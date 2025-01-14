import { toast } from "sonner";
import SectionTitle from "../../components/SectionTitle";
import useAuth from "./../../hooks/useAuth";
import { useState } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import useTheme from "../../hooks/useTheme";

function Contact() {
  const { user } = useAuth();
  const [disable, setDisable] = useState(false);
  const { theme } = useTheme();
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisable(true);
    toast.success("Thank you for reaching out! We’ll get back to you shortly.");
  };
  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-darkBackground text-textLight"
          : "bg-lightBackground text-textDark"
      }`}
    >
      <div className="flex justify-around  gap-7  min-h-screen py-8 container mx-auto">
        <div className="p-10 rounded-md  lg:w-9/12">
          <div className="w-full flex items-center justify-center">
            <div>
              <SectionTitle title={"Contact Us"} description={"Get In Touch"} />
              <p className="mt-5 text-center text-sm">
                We’d Love to Hear From You! Whether you have questions about our
                products, need assistance with your order, or just want to share
                <span className="hidden md:block">
                  your thoughts, we’re here to help. Connect with us and let’s
                  make your Beauty Luxe experience exceptional!
                </span>
              </p>
              <div className="divider"></div>
              <div className="w-full h-full flex flex-col xl:flex-row justify-between items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-start gap-6 mb-8">
                    <div className=" text-4xl">
                      <FiPhone />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold ">Phone</h3>
                      <p className="">+1-800-555-1234</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6 mb-8">
                    <div className="text-4xl">
                      <FiMail />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold ">Email</h3>
                      <p className="text-gray-600">support@beautyluxe.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className="text-4xl">
                      <FiMapPin />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold ">Location</h3>
                      <p className="text-gray-600">
                        123 Beauty St, Luxe City, NY 10001
                      </p>
                    </div>
                  </div>
                </div>
                <div className="divider"></div>
                <form className="xl:w-1/2" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <div>
                      <label>Name:</label>
                      <input
                        type="text"
                        className={`input-style ${
                          theme === "dark"
                            ? "bg-textDark"
                            : "bg-lightBackground"
                        }`}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label>Email:</label>
                      <input
                        type="email"
                        className={`input-style ${
                          theme === "dark"
                            ? "bg-textDark"
                            : "bg-lightBackground"
                        }`}
                        placeholder={user?.email || "Enter your email"}
                        required
                      />
                    </div>
                    <div>
                      <label>Message:</label>
                      <textarea
                        className={`input-style ${
                          theme === "dark"
                            ? "bg-textDark"
                            : "bg-lightBackground"
                        }`}
                        placeholder="Write your message here"
                        rows="4"
                        required
                      ></textarea>
                    </div>
                    <div>
                      <button
                        disabled={disable}
                        type="submit"
                        className="my-btn mt-4 w-full"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
