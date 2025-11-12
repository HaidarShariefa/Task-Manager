import { useUserAuth } from "../../hooks/useUserAuth";

export default function UserDashboard() {
  useUserAuth();
  return <div>User Dashboard</div>;
}
