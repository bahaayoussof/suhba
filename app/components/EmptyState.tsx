import type { ReactNode } from "react";
import { cn } from "../lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionButton?: ReactNode;
  className?: string;
}

export default function EmptyState({
  title = "لا يوجد مجلس",
  description = "لم يتم تعيين أي مجلس بعد!",
  actionButton,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-20 px-6 text-center w-full bg-transparent",
        className
      )}
    >
      {/* Premium Inline Illustration matching the image */}
      <svg
        width="220"
        height="160"
        viewBox="0 0 220 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto mb-8 select-none"
      >
        {/* Background Organic Blob */}
        <path
          d="M48 68c-18-5-28-30-18-52s36-24 52-10 24 24 16 44-32 23-50 18z"
          fill="#dbe6e7"
          opacity="0.75"
        />

        {/* Soft Drop Shadow */}
        <ellipse cx="110" cy="142" rx="44" ry="4" fill="#e2ebeb" />

        {/* Sparkles / Yellow Dots */}
        {/* Top Left Plus */}
        <path
          d="M52 28h8M56 24v8"
          stroke="#dfb658"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Top Center-Right Plus */}
        <path
          d="M148 32h6M151 29v6"
          stroke="#dfb658"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Bottom Center Plus */}
        <path
          d="M107 128h6M110 125v6"
          stroke="#dfb658"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Small Orange/Yellow Dots */}
        <circle cx="42" cy="82" r="2" fill="#dfb658" />
        <circle cx="178" cy="62" r="1.5" fill="#dfb658" />

        {/* Calendar Board Container */}
        {/* Main board border & background */}
        <rect
          x="62"
          y="46"
          width="96"
          height="68"
          rx="10"
          fill="white"
          stroke="#337582"
          strokeWidth="1.5"
        />

        {/* Top Teal Bar */}
        <path
          d="M63 56c0-5 4-9 9-9h76c5 0 9 4 9 9v9H63v-9z"
          fill="#044654"
        />

        {/* Clips/Hooks */}
        <rect x="83" y="38" width="3" height="14" rx="1.5" fill="#dfb658" />
        <rect x="134" y="38" width="3" height="14" rx="1.5" fill="#dfb658" />

        {/* Inner White Frame */}
        <rect
          x="70"
          y="70"
          width="80"
          height="36"
          rx="5"
          fill="white"
          stroke="#a4c6cc"
          strokeWidth="1"
        />

        {/* Sad Face Eyes */}
        <circle cx="94" cy="85" r="2.5" fill="#044654" />
        <circle cx="126" cy="85" r="2.5" fill="#044654" />

        {/* Sad Face Mouth (Arc downwards / Arch) */}
        <path
          d="M102 102q8-8 16 0"
          stroke="#044654"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <h3 className="text-3xl font-extrabold text-[var(--deep-teal-900)] mb-2 leading-tight">
        {title}
      </h3>
      {description && (
        <p className="text-base text-[#8eacac] font-medium leading-relaxed">
          {description}
        </p>
      )}
      {actionButton && <div className="mt-8">{actionButton}</div>}
    </div>
  );
}
