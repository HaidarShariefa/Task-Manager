import { useContext } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/userContext";

export default function Dashboard() {
  useUserAuth();

  const { user } = useContext(UserContext);
  return <div>Admin Dashboard</div>;
}
