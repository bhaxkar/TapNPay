const UserCardShimmer = () => {
  return (
    <div className="space-y-4">
      {Array(10)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-sky-50 p-5 rounded-2xl shadow-sm animate-pulse"
          >
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-slate-300 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 w-40 bg-slate-300 rounded"></div>
                <div className="h-3 w-32 bg-slate-300 rounded"></div>
              </div>
            </div>
            <div className="h-8 w-20 bg-slate-300 rounded-xl"></div>
          </div>
        ))}
    </div>
  );
};

export default UserCardShimmer;
