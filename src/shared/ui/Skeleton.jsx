import { cn } from "../lib/cn";

export default function Skeleton({ className = "" }) {
  return <div aria-hidden="true" className={cn("animate-pulse bg-[#EEE7E3]", className)} />;
}