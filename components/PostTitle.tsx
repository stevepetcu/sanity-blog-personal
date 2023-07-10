export default function PostTitle({ children }) {
  return (
    <h1 id={'post-title'}
      className="font-normal tracking-tighter text-slate-800
      text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl
      leading-[2.5rem] sm:leading-[3.25rem] md:leading-[4.15rem] lg:leading-[5.75rem] xl:leading-[7.25rem]">
      {children}
    </h1>
  );
}
