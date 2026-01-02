"use client";

import { SearchResult } from "@/lib/types";
import { ExternalLink, ShoppingBag } from "lucide-react";

interface Props {
  result: SearchResult;
}

export default function ResultCard({ result }: Props) {
  return (
    <div className="card flex gap-4 p-4">
      <div className="h-20 w-20 overflow-hidden rounded-xl bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={result.thumbnail} alt={result.title} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <h4 className="text-base font-semibold text-slate-900">{result.title}</h4>
          <a
            href={result.link}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-brand-blue hover:underline"
          >
            Ver <ExternalLink className="ml-1 inline h-4 w-4" />
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="text-lg font-bold text-slate-900">${result.price.toLocaleString()}</span>
          <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
            <ShoppingBag className="h-4 w-4 text-brand-blue" /> {result.seller}
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
            {result.location}
          </span>
        </div>
      </div>
    </div>
  );
}
