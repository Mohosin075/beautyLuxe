import { useForm } from "react-hook-form";
import { MdKeyboardTab } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import SectionTitle from "../../../components/SectionTitle";
import Swal from "sweetalert2";
import { toast } from "sonner";
import Loading from "../../loading/Loading";
import {
  useGetAllUserQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../../redux/api/baseApi";

function UpdateUser() {
  const { email } = useParams();
  const navigate = useNavigate();

  const { data: singleUser, isLoading } = useGetUserQuery({ email });
  const { refetch } = useGetAllUserQuery();
  const [updateUser] = useUpdateUserMutation({});

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
        await updateUser({ id: singleUser?._id, body: data });
        refetch();
        toast.success("updated successfully!");
        navigate("/dashboard/users");
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex bg-background justify-around  min-h-screen py-8">
      <div className="p-10 rounded-md w-9/12">
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
                  <label>Update Role </label>
                  <select
                    {...register("role")}
                    defaultValue={singleUser?.role}
                    className="input-style"
                  >
                    <option value={"buyer"}>buyer</option>
                    <option value={"seller"}>seller</option>
                    <option value={"admin"}>admin</option>
                  </select>
                </div>
                <div className="text-start space-y-1 w-full">
                  <label>Update Status </label>
                  <select
                    {...register("status")}
                    defaultValue={singleUser?.status}
                    className="input-style"
                  >
                    <option value={"pending"}>pending</option>
                    <option value={"approved"}>approved</option>
                    <option value={"blocked"}>blocked</option>
                  </select>
                </div>
              </div>
              <div>
                <button type="submit" className="my-btn mt-8  ">
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
