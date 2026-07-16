function OwnerLoading() {
  return (
    <div className="animate-pulse space-y-4">

      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="h-16 rounded-xl bg-slate-100"
        />
      ))}

    </div>
  );
}

export default OwnerLoading;