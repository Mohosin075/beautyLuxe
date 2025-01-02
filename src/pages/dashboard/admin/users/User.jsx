import axios from "axios";
import { useEffect, useState } from "react";
import UserTableRow from "../../../../components/UserTableRow";
import useTheme from "../../../../hooks/useTheme";

function User() {
  const [loading, setLoading] = useState(false);
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("beautyLuxe");
    const fetchUser = async () => {
      setLoading(true);
      axios
        .get(`https://beauty-luxe-server.vercel.app/users`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data) {
            setLoading(false);
            setAllUser(res.data);
          }
        });
    };

    fetchUser();
  }, [allUser]);

  const { theme } = useTheme();

  return (
    <div
      className={` ${
        theme === "dark"
          ? "bg-background text-textLight"
          : "bg-background text-textDark"
      }`}
    >
      <div className="min-h-screen flex items-center justify-center">
        <div className="shadow-2xl p-6 rounded-md  max-w-7xl w-full min-h-screen">
          <h1 className="text-2xl lg:text-4xl font-bold mb-6 text-center">
            All Users
          </h1>
          <div className="overflow-x-auto">
            <table className="table-auto table table-xs table-pin-rows w-full border-collapse border border-primary-dark max-h-screen">
              <thead>
                <tr
                  className={` text-center ${
                    theme === "dark"
                      ? "bg-primaryAccent text-textLight"
                      : "bg-primaryAccent text-textLight"
                  }`}
                >
                  <th className="t-head">#</th>
                  <th className="t-head">Name</th>
                  <th className="t-head">Email</th>
                  <th className="t-head">Role</th>
                  <th className="t-head">Status</th>
                  {/* <th className="t-head">Wishlist</th> */}
                  <th className="t-head">update</th>
                  <th className="t-head">delete</th>
                </tr>
              </thead>
              <tbody>
                {allUser.length > 0 &&
                  allUser.map((user, i) => (
                    <UserTableRow user={user} key={i} i={i} />
                  ))}
              </tbody>
            </table>
            {allUser.length === 0 && (
              <div className="text-center my-5 text-xl md:text-3xl">
                No User found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
