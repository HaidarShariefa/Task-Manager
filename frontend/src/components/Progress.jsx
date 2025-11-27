export default function Progress({ progress, status }) {
  function getColor() {
    switch (status) {
      case "Completed":
        return "bg-indigo-500 text-indigo-500 border border-indigo-500/10";
      case "In Progress":
        return "bg-cyan-500 text-cyan-500 border border-cyan-500/10";
      default:
        return "bg-violet-500 text-violet-500 border border-violet-500/10";
    }
  }

  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5">
      <div
        className={`h-1.5 text-center text-xs font-medium rounded-full ${getColor()}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
