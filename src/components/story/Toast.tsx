export function Toast({ message }: { message: string }) {
  return (
    <div
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-center text-xs font-bold text-white shadow-lg"
      role="status"
    >
      {message}
    </div>
  );
}
