export function Seal({ size = 88 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="60" cy="60" r="58" fill="#1b2a4a" />
      <circle
        cx="60"
        cy="60"
        r="52"
        fill="none"
        stroke="#c5a35a"
        strokeWidth="2.5"
      />
      <circle
        cx="60"
        cy="60"
        r="46"
        fill="none"
        stroke="#c5a35a"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      <path
        d="M60 28l6.2 16.4H84l-14.1 10.2 5.4 16.6L60 61.2 44.7 71.2l5.4-16.6L36 44.4h17.8L60 28z"
        fill="#c5a35a"
      />
      <text
        x="60"
        y="88"
        textAnchor="middle"
        fill="#f4efe4"
        fontSize="7.5"
        fontFamily="IBM Plex Mono, ui-monospace, monospace"
        letterSpacing="1.4"
      >
        DEPT. OF GOING OUT
      </text>
    </svg>
  );
}
