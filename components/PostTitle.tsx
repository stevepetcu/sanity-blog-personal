export default function PostTitle({ children }) {
  return (
    <h1 className="text-4xl font-normal leading-tight tracking-tighter text-slate-700 md:text-6xl lg:text-8xl">
      {children}
    </h1>
  );
}
