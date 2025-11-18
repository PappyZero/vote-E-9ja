import React from 'react';

const Logo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 220 40"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="vote-e-9ja Logo"
  >
    <g fill="hsl(var(--primary))">
      {/* Green Square - representing Nigeria */}
      <rect x="0" y="5" width="30" height="30" rx="4" />
      {/* White checkmark inside */}
      <path d="M 7 20 L 13 26 L 24 15" fill="none" stroke="hsl(var(--background))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <text
      x="40"
      y="28"
      fontFamily="'PT Sans', sans-serif"
      fontSize="24"
      fontWeight="bold"
      fill="hsl(var(--foreground))"
    >
      vote-e-9ja
    </text>
  </svg>
);

export default Logo;
