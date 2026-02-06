import mark from "@assets/brand/sticker-tooth-sparkle.png";
import { cn } from "@/lib/utils";

interface HeadingMarkProps {
  className?: string;
}

export default function HeadingMark({ className }: HeadingMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("hidden lg:inline-flex items-center justify-center", className)}
    >
      <img src={mark} alt="" className="h-8 w-8" loading="lazy" decoding="async" />
    </span>
  );
}

