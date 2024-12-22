import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

function useUserFromDB() {
  const { user } = useAuth();
  const [userFromDb, setUserFromDb] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const token = localStorage.getItem("beautyLuxe");
      axios
        .get(`http://localhost:3000/user/${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUserFromDb(res.data);
          setLoading(false);
        });
    };

    if (user) {
      fetchUser();
    }
  }, [user]);
  return { userFromDb, loading };
}

export default useUserFromDB;
