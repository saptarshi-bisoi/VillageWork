export default function Logo({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* App Icon Background */}
      <rect width="100" height="100" rx="22" fill="#111827" />
      
      {/* Background Glow */}
      <circle cx="50" cy="55" r="32" fill="#16a34a" opacity="0.35" />
      
      {/* Ground Line */}
      <line x1="8" y1="72" x2="92" y2="72" stroke="#22c55e" strokeWidth="1.5" opacity="0.6" />
      
      {/* Left Tree */}
      <rect x="18" y="55" width="4" height="17" fill="#22c55e" />
      <circle cx="20" cy="48" r="9" fill="#22c55e" />
      
      {/* Right Tree */}
      <rect x="78" y="55" width="4" height="17" fill="#22c55e" />
      <circle cx="80" cy="48" r="9" fill="#22c55e" />
      
      {/* House Body */}
      <rect x="28" y="50" width="44" height="22" fill="white" />
      
      {/* House Roof */}
      <polygon points="24,50 50,30 76,50" fill="#22c55e" />
      
      {/* House Door */}
      <rect x="45" y="58" width="10" height="14" fill="#22c55e" rx="1" />
      
      {/* House Windows */}
      <rect x="33" y="54" width="7" height="7" fill="#22c55e" rx="0.5" />
      <rect x="60" y="54" width="7" height="7" fill="#22c55e" rx="0.5" />
      
      {/* Gear Overlay */}
      <g transform="translate(56, 52)">
        <circle cx="16" cy="16" r="15" fill="#111827" />
        {/* Gear Teeth */}
        <path d="M16 2 v4 M16 26 v4 M2 16 h4 M26 16 h4 M6.1 6.1 l2.8 2.8 M23.1 23.1 l-2.8 -2.8 M23.9 6.1 l-2.8 2.8 M6.1 23.9 l2.8 -2.8" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
        {/* Gear Body */}
        <circle cx="16" cy="16" r="9" fill="transparent" stroke="#22c55e" strokeWidth="3.5" />
        <circle cx="16" cy="16" r="3.5" fill="#22c55e" />
      </g>
    </svg>
  );
}
