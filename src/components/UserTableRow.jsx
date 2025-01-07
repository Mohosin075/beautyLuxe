/* eslint-disable react/prop-types */
import { IoTrashBin } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { NavLink } from "react-router";
import useTheme from "../hooks/useTheme";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
} from "../redux/api/baseApi";

function UserTableRow({ user, i }) {
  const [deleteUser] = useDeleteUserMutation();
  const { refetch } = useGetAllUserQuery();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteUser({ id });
        toast("deleted!");
        refetch();
      }
    });
  };

  const { theme } = useTheme();

  return (
    <tr
      key={user?.email}
      className={` ${
        theme === "dark"
          ? "bg-background text-textLight"
          : "bg-background text-textDark"
      }`}
    >
      <td className="t-d">{i + 1}</td>
      <td className="t-d">{user?.email}</td>
      <td className="t-d">{user?.name}</td>
      <td className="t-d">{user?.role}</td>
      <td className="t-d">{user?.status}</td>
      {/* <td className="t-d">
        {user?.wishlist.length > 0 ? user?.wishlist.join(", ") : "No items"}
      </td> */}

      <td className="t-d">
        <NavLink
          to={`/dashboard/update-user/${user.email}`}
          className="my-btn w-fit "
        >
          <FaEdit />
        </NavLink>
      </td>
      <td className="t-d">
        <button onClick={() => handleDelete(user._id)} className="my-btn">
          <IoTrashBin />
        </button>
      </td>
    </tr>
  );
}

export default UserTableRow;
