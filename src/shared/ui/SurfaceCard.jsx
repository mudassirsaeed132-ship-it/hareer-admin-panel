export default function SurfaceCard({ className = "", children }) {
  return (
    <section className={`border border-[#E9E3DF] bg-white ${className}`}>
      {children}
    </section>
  );
}