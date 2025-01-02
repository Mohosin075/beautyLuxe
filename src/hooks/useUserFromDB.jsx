import useAuth from "./useAuth";
import { useGetUserQuery } from "../redux/api/baseApi";

function useUserFromDB() {
  const { user } = useAuth();
  const { data: userFromDb, isLoading, refetch } = useGetUserQuery({
    email: user?.email,
  });
  return { userFromDb, isLoading , refetch};
}

export default useUserFromDB;
