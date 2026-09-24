import type { SVGProps } from "react";

export function NotFoundIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 240 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="404"
      role="img"
      {...props}
    >
      <defs>
        <linearGradient
          id="not-found-gradient"
          x1="35"
          y1="20"
          x2="205"
          y2="105"
        >
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>

        <filter
          id="not-found-glow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <style>
          {`
            @keyframes not-found-float {
              0%, 100% {
                transform: translateY(0);
              }

              50% {
                transform: translateY(-5px);
              }
            }

            @keyframes not-found-pulse {
              0%, 100% {
                opacity: 0.35;
                transform: scale(0.9);
              }

              50% {
                opacity: 0.8;
                transform: scale(1);
              }
            }

            .not-found-number {
              animation: not-found-float 3s ease-in-out infinite;
              transform-box: fill-box;
              transform-origin: center;
            }

            .not-found-dot {
              animation: not-found-pulse 2s ease-in-out infinite;
              transform-box: fill-box;
              transform-origin: center;
            }

            @media (prefers-reduced-motion: reduce) {
              .not-found-number,
              .not-found-dot {
                animation: none;
              }
            }
          `}
        </style>
      </defs>

      {/* Decorative dots */}
      <circle className="not-found-dot" cx="22" cy="25" r="4" fill="#8B5CF6" />

      <circle
        className="not-found-dot"
        cx="218"
        cy="92"
        r="3"
        fill="#06B6D4"
        style={{ animationDelay: "0.6s" }}
      />

      <circle cx="205" cy="22" r="2" fill="#3B82F6" opacity="0.6" />

      <circle cx="35" cy="94" r="2" fill="#06B6D4" opacity="0.6" />

      {/* Soft background glow */}
      <ellipse
        cx="120"
        cy="103"
        rx="70"
        ry="7"
        fill="url(#not-found-gradient)"
        opacity="0.12"
      />

      {/* 404 */}
      <g className="not-found-number" filter="url(#not-found-glow)">
        <text
          x="120"
          y="82"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontSize="68"
          fontWeight="800"
          letterSpacing="-4"
          fill="url(#not-found-gradient)"
        >
          404
        </text>
      </g>

      {/* Small broken path underneath */}
      <path
        d="M78 94H103L109 89L116 96L124 88L132 94H162"
        stroke="url(#not-found-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />

      <circle cx="73" cy="94" r="2.5" fill="#8B5CF6" />
      <circle cx="167" cy="94" r="2.5" fill="#3B82F6" />
    </svg>
  );
}
