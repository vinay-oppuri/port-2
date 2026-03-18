// components/Logo.tsx
const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="125 657 1750 808"
      width={50}
      height={50}
      className={className}
    >
      <path
        d="M 1158 876 L 1158 1425 L 1659 1425 L 1659 1251 L 1333 1250 L 1333 876 Z M 1334 700 L 1334 874 L 1660 875 L 1661 1250 L 1835 1249 L 1835 700 Z M 165 697 L 291 823 L 291 824 L 886 1419 L 886 1425 L 1060 1425 L 1060 700 L 886 700 L 884 1170 L 414 700 L 412 702 L 380 702 L 332 701 L 284 699 L 236 699 L 188 698 L 187 697 Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}
export default Logo