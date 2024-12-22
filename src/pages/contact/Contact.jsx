import { toast } from "sonner";
import SectionTitle from "../../components/SectionTitle";
import useAuth from "./../../hooks/useAuth";
import { useState } from "react";

function Contact() {
  const { user } = useAuth();
  const [disable, setDisable] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisable(true);
    toast.success("Thank you for reaching out! We’ll get back to you shortly.");
  };
  return (
    <div>
      <div className="flex justify-around  gap-7 bg-primary-light min-h-screen py-8">
        <div className="p-10 rounded-md bg-primary-light w-9/12">
          <div className="w-full flex items-center justify-center">
            <div>
              <SectionTitle title={"Contact Us"} description={"Get In Touch"} />
              <p className="mt-5 text-center text-sm text-secondary-dark">
                We’d Love to Hear From You! Whether you have questions about our
                products, need assistance with your order, or just want to share
                your thoughts, we’re here to help. Connect with us and let’s
                make your Beauty Luxe experience exceptional!
              </p>
              <div className="divider"></div>
              <div className="w-full h-full flex flex-col xl:flex-row justify-between items-center gap-8">
                <div className="xl:w-1/2 h-full hidden xl:block">
                  <img
                    className="w-full h-full object-contain rounded-lg"
                    src="https://i.ibb.co.com/DCN76KN/online-reservation-section-beauty-website-bowwe.webp"
                    alt=""
                  />
                </div>
                <form className="xl:w-1/2" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <div>
                      <label>Name:</label>
                      <input
                        type="text"
                        className="px-2 py-1 w-full border-b-4 outline-none border-t border-l border-r rounded-md border-primary-dark text-lg bg-purple-200"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label>Email:</label>
                      <input
                        type="email"
                        className="px-2 py-1 w-full border-b-4 outline-none border-t border-l border-r rounded-md border-primary-dark text-lg bg-purple-200"
                        placeholder={user?.email}
                        required
                      />
                    </div>
                    <div>
                      <label>Message:</label>
                      <textarea
                        className="px-2 py-1 w-full border-b-4 outline-none border-t border-l border-r rounded-md border-primary-dark text-lg bg-purple-200"
                        placeholder="Write your message here"
                        rows="4"
                        required
                      ></textarea>
                    </div>
                    <div>
                      <button
                        disabled={disable}
                        type="submit"
                        className="my-btn mt-4 w-full text-center bg-primary-dark text-white hover:bg-purple-300 hover:text-purple-900"
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
