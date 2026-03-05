export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-dark-800" />
          <div className="absolute inset-0 rounded-full border-4 border-podcast-500 border-t-transparent animate-spin" />
        </div>
        <p className="text-dark-400 text-sm font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  );
}