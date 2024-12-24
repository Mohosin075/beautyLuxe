import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardTab } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import SectionTitle from "../../../components/SectionTitle";
import Swal from "sweetalert2";
import { toast } from "sonner";
import Loading from "../../loading/Loading";

function UpdateUser() {
  const [loading, setLoading] = useState(false);
  const [singleUser, setSingleUser] = useState(null);
  const { email } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("beautyLuxe");
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      axios
        .get(`https://beauty-luxe-server.vercel.app/user/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res) {
            setLoading(false);
            setSingleUser(res.data);
          }
        });
    };

    if (token) {
      fetchUser();
    }
  }, [email, token]);

  const { register, handleSubmit } = useForm();

  const handleUpdate = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .patch(
            `https://beauty-luxe-server.vercel.app/user/${singleUser?._id}`,
            data,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            if (res) {
              toast.success("updated successfully!");
              navigate("/dashboard/users");
            }
          });
      }
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-around  gap-7 bg-primary-light min-h-screen py-8">
      <div className="p-10 rounded-md bg-primary-light w-9/12">
        <div>
          <SectionTitle
            title={"Update User"}
            description={"Carefully update!"}
          />
          <div className="divider"></div>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="space-y-2">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">
                  Name : {singleUser?.name}
                </h2>
                <h2 className=" font-semibold">Email : {singleUser?.email}</h2>
                <p className=" font-semibold">Role : {singleUser?.role}</p>
                <p className="font-semibold">Status : {singleUser?.status}</p>
              </div>
              <div className="flex justify-between gap-6">
                <div className="text-start space-y-1 w-full">
                  <label>Role : </label>
                  <select
                    {...register("role")}
                    defaultValue={singleUser?.role}
                    className="px-2 py-1 w-full border-b-4 outline-none border-t border-l border-r rounded-md border-primary-dark text-lg bg-purple-200"
                  >
                    <option value={"buyer"}>buyer</option>
                    <option value={"seller"}>seller</option>
                    <option value={"admin"}>admin</option>
                  </select>
                </div>
                <div className="text-start space-y-1 w-full">
                  <label>Status : </label>
                  <select
                    {...register("status")}
                    defaultValue={singleUser?.status}
                    className="px-2 py-1 w-full border-b-4 outline-none border-t border-l border-r rounded-md border-primary-dark text-lg bg-purple-200"
                  >
                    <option value={"pending"}>pending</option>
                    <option value={"approved"}>approved</option>
                    <option value={"blocked"}>blocked</option>
                  </select>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="my-btn mt-8  text-center bg-primary-dark text-white hover:bg-purple-300 hover:text-purple-900"
                >
                  Update
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
  );
}

export default UpdateUser;
