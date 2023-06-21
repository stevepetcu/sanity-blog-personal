export default function PostTitle({ children }) {
  return (
    <h1 id={'post-title'}
      className="text-4xl font-normal leading-tight tracking-tighter
      text-slate-800 md:text-6xl lg:text-8xl">
      {children}
    </h1>
  );
}
