export default function UserCard({ userInfo }) {
  return (
    <div className="user-card p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={userInfo?.profileImgUrl}
            alt={`Avatar`}
            className="w-12 h-12 rounded-full border-2 border-white"
          />

          <div>
            <p className="text-sm font-medium">{userInfo.name}</p>
            <p className="text-xs text-gray-500">{userInfo.email}</p>
          </div>
        </div>
      </div>

      <div className="flex items-end gap-3 mt-5">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />
        <StatCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="In Progress"
        />
        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="Completed"
        />
      </div>
    </div>
  );
}

function StatCard({ label, count, status }) {
  function getStatusTagColor() {
    switch (status) {
      case "In Progress":
        return "bg-gray-50 text-cyan-500";
      case "Completed":
        return "bg-gray-50 text-indigo-500";
      default:
        return "bg-gray-50 text-violet-500";
    }
  }

  return (
    <div
      className={`flex-1 text-[10px] font-semibold ${getStatusTagColor()} px-4 py-0.5 rounded `}
    >
      <span className="text-[12px]">{count}</span> <br /> {label}
    </div>
  );
}
