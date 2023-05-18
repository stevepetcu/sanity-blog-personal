export default function PostTitle({ children }) {
  return (
    <h1 className="antialiased text-2xl font-bold leading-tight tracking-tighter md:text-left md:text-5xl md:leading-none lg:text-7xl">
      {children}
    </h1>
  )
}
