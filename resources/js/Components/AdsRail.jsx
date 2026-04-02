import React from "react";
import { ExternalLink, Megaphone } from "lucide-react";

export default function AdsRail({ ads = [], title = "Sponsored" }) {
    if (!Array.isArray(ads) || ads.length === 0) return null;

    const getDisplayImage = (image) => {
        if (!image) return null;
        return image.startsWith("http") || image.startsWith("/")
            ? image
            : `/${image}`;
    };

    return (
        <div className="p-6 bg-white rounded-[28px] border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-brand-primary" />
                {title}
            </h3>

            <div className="space-y-4">
                {ads.map((ad) => (
                    <a
                        key={ad.id}
                        href={ad.target_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-2xl border border-slate-100 overflow-hidden hover:border-sky-300 hover:shadow-md transition-all"
                    >
                        <div className="aspect-[16/9] bg-slate-100">
                            <img
                                src={getDisplayImage(ad.image)}
                                alt={ad.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <div className="p-3 flex items-start justify-between gap-2">
                            <p className="text-xs font-bold text-slate-700 line-clamp-2">
                                {ad.title}
                            </p>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
