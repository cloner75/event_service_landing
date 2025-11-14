"use client";

export default function SmoothRadius({
  radius = 32,
  className = "",
  children,
}) {
  const maskId = `smooth-radius-${radius}-${Math.random()}`;

  // Superellipse generator (n=4)
  const steps = 64;
  const path = [];
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * 2 * Math.PI;
    const x =
      Math.sign(Math.cos(theta)) * Math.pow(Math.abs(Math.cos(theta)), 0.5);
    const y =
      Math.sign(Math.sin(theta)) * Math.pow(Math.abs(Math.sin(theta)), 0.5);
    path.push(`${(x + 1) * 50} ${(y + 1) * 50}`);
  }
  const d = `M ${path.join(" L ")} Z`;

  return (
    <div className={`relative ${className}`}>
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <mask id={maskId}>
            <rect width="100%" height="100%" rx={radius} fill="white" />
            <path d={d} fill="black" />
          </mask>
        </defs>
      </svg>

      <div
        style={{ mask: `url(#${maskId})`, WebkitMask: `url(#${maskId})` }}
        className="w-full h-full"
      >
        {children}
      </div>
    </div>
  );
}
