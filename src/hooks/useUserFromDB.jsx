import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

function useUserFromDB() {
  const { user } = useAuth();
  const [userFromDb, setUserFromDb] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadStatus, setLoadStatus] = useState(false);

  console.log({loadStatus});

  useEffect(() => {
    const token = localStorage.getItem("beautyLuxe");
    const fetchUser = async () => {
      setLoading(true);
      axios
        .get(`http://localhost:3000/user/${user.email}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data) {
            setLoading(false);
            setUserFromDb(res.data);
          }
        });
    };

    if (user && token) {
      fetchUser();
    }
  }, [user, loadStatus]);
  return { userFromDb, loading, loadStatus, setLoadStatus };
}

export default useUserFromDB;
