import { useState } from "react";

interface IteroScannerImageProps {
  className?: string;
}

export default function IteroScannerImage({
  className = "",
}: IteroScannerImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-sm text-gray-500 ${className}`}
      >
        iTero digital scanner photo coming soon.
      </div>
    );
  }

  return (
    <img
      src="/images/itero-scanner.jpg"
      alt="iTero digital scanner in a Los Gatos dental office"
      className={`h-full w-full rounded-2xl object-cover shadow-lg ${className}`}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}
