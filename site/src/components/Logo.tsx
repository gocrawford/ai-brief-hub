// Custom inline SVG mark — abstract "signal pulse" inside a hex frame.
// Geometric, monochrome via currentColor, works at 24px and 200px.
export default function Logo({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="AI Brief Hub mark"
      className={className}
    >
      {/* Hex frame */}
      <path d="M16 2.6 L27 8.8 V23.2 L16 29.4 L5 23.2 V8.8 Z" opacity="0.55" />
      {/* Signal pulse */}
      <path d="M7.5 16 L11 16 L13 12 L16 21 L19 11 L21 16 L24.5 16" />
    </svg>
  );
}
