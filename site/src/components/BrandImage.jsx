import { useState } from "react";

export default function BrandImage({ src, alt, className = "", fallbackLabel }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-green to-green-deep ${className}`}>
      {!failed && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
      {failed && fallbackLabel && (
        <span className="absolute inset-0 flex items-center justify-center font-head font-bold text-gold-pale/70 text-sm text-center px-4">
          {fallbackLabel}
        </span>
      )}
    </div>
  );
}
