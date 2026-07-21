"use client";

import { useEffect } from "react";
import { isLiveStoryGeneration } from "@/lib/story-mode";

type ModalDialogProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function ModalDialog({ open, title, onClose, children }: ModalDialogProps) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 py-6" role="presentation">
      <div
        className="w-full max-w-sm rounded-2xl border-2 border-slate-800 bg-white p-5 text-slate-950 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="uri-nuri-dialog-title"
      >
        <h2 id="uri-nuri-dialog-title" className="text-lg font-black">
          {title}
        </h2>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}

export function ConfirmationDialog({
  open,
  title,
  message,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  message: string;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <ModalDialog open={open} title={title} onClose={onCancel}>
      <p className="text-sm font-medium leading-6 text-slate-700">{message}</p>
      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-slate-100 px-5 text-sm font-black text-slate-950 transition hover:bg-slate-200 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#f3b400] bg-[#ffdc76] px-5 text-sm font-black text-slate-950 transition hover:bg-[#ffd45a] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-yellow-200"
        >
          {confirmLabel}
        </button>
      </div>
    </ModalDialog>
  );
}

export function SettingsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <ModalDialog open={open} title="Settings" onClose={onClose}>
      <p className="text-sm font-medium leading-6 text-slate-700">
        UriNuri is ready for a calm, creative story session. Here is what is active for this demo.
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2" aria-label="Current UriNuri settings">
        <SettingCard label="Story mode" value={isLiveStoryGeneration ? "Live AI" : "Demo Mode"} />
        <SettingCard label="Reading style" value="Child-friendly" />
        <SettingCard label="Saved stories" value="This device" />
        <SettingCard label="Interface" value="English" />
      </div>
      <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-sm font-bold leading-5 text-emerald-950">
        Choose characters, themes, and story paths to make each adventure yours.
      </div>
      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-slate-100 px-6 text-sm font-black text-slate-950 transition hover:bg-slate-200 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          Close
        </button>
      </div>
    </ModalDialog>
  );
}

function SettingCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
      <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-black text-slate-950">{value}</p>
    </div>
  );
}
