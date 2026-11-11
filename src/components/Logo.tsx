import { Link } from "react-router-dom";
import cloud from "@/assets/Vector.png";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      aria-label="Weather, página inicial"
      className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue_base"
    >
      <img src={cloud} alt="" width={37} height={24} />
      {!compact && <span className="text-2xl font-bold text-white">Weather</span>}
    </Link>
  );
}
