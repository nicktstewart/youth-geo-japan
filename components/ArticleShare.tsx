"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n";

type ArticleShareProps = { title: string; href: string; locale: Locale };

export function ArticleShare({ title, href, locale }: ArticleShareProps) {
  const [status, setStatus] = useState("");
  const [manualUrl, setManualUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const ja = locale === "ja";

  async function share() {
    const url = new URL(href, window.location.origin).href;
    setStatus("");
    setManualUrl("");
    setBusy(true);
    try {
      if (navigator.share) {
        try {
          await navigator.share({ title, url });
          return;
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") return;
        }
      }
      try {
        await navigator.clipboard.writeText(url);
        setStatus(ja ? "リンクをコピーしました" : "Link copied");
      } catch {
        setManualUrl(url);
        setStatus(ja ? "下のリンクを選択してコピーしてください" : "Select and copy the link below");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-4">
      <button type="button" onClick={() => void share()} disabled={busy} aria-label={ja ? `${title}を共有` : `Share ${title}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#6A5748] transition hover:text-[#3e3a39] disabled:opacity-50">
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 16V3m-4 4 4-4 4 4M6 11H4v10h16V11h-2" />
        </svg>
        Share
      </button>
      <p role="status" className="text-xs text-[#6A5748]">{status}</p>
      {manualUrl ? <input aria-label={ja ? "記事へのリンク" : "Article link"} readOnly value={manualUrl} onFocus={(event) => event.currentTarget.select()} className="mt-2 w-full rounded border border-[#6A5748]/20 bg-white px-3 py-2 text-sm text-[#3e3a39]" /> : null}
    </div>
  );
}
