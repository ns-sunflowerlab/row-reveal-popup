// components/Loader.tsx
export default function Loader() {
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}
