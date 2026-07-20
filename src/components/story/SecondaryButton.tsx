import Link from "next/link";

export function SecondaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-slate-100 px-6 text-sm font-black text-slate-950 shadow-sm transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 ${className}`}
    >
      {children}
    </Link>
  );
}
