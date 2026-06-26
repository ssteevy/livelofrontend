import { PackageOpen, TriangleAlert } from "lucide-react";

export function EmptyState({
  title,
  message,
}: {
  title: string;
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#B3D4E5] bg-white px-6 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E2F4FF] text-[#4E73C7]">
        <PackageOpen aria-hidden="true" size={26} />
      </span>
      <h3 className="text-lg font-black text-[#4E73C7]">{title}</h3>
      {message ? <p className="max-w-md text-sm font-semibold text-[#ACACAC]">{message}</p> : null}
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-red-200 bg-red-50 px-6 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
        <TriangleAlert aria-hidden="true" size={26} />
      </span>
      <p className="max-w-md text-sm font-semibold text-red-700">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-xl bg-[#4E73C7] px-4 py-2 text-sm font-black text-white transition hover:bg-[#4E73C7]/90"
        >
          Réessayer
        </button>
      ) : null}
    </div>
  );
}
