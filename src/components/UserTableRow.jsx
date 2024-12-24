/* eslint-disable react/prop-types */
import axios from "axios";
import { IoTrashBin } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { NavLink } from "react-router";

function UserTableRow({ user, i }) {
  const token = localStorage.getItem("beautyLuxe");
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            if (res.data.deletedCount === 1) {
              toast.success("deleted successfully!");
            }
          });
      }
    });
  };

  return (
    <tr
      key={user?.email}
      className="hover:bg-primary-light text-secondary-dark transition-all"
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
          className="my-btn w-fit cursor-pointer border-secondary-light bg-secondary-dark text-white hover:bg-sky-800 hover:text-white"
        >
          <FaEdit />
        </NavLink>
      </td>
      <td className="t-d">
        <button
          onClick={() => handleDelete(user._id)}
          className="my-btn bg-primary-dark text-white hover:bg-purple-300 hover:text-purple-900"
        >
          <IoTrashBin />
        </button>
      </td>
    </tr>
  );
}

export default UserTableRow;
