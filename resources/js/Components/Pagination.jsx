import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="flex items-center justify-center gap-1 mt-8">
            {links.map((link, i) => {
                const label = link.label
                    .replace('&laquo;', '')
                    .replace('&raquo;', '')
                    .replace('&lsaquo;', '')
                    .replace('&rsaquo;', '')
                    .trim();

                let displayLabel;
                if (i === 0) {
                    displayLabel = 'قبلی';
                } else if (i === links.length - 1) {
                    displayLabel = 'بعدی';
                } else {
                    displayLabel = label;
                }

                return (
                    <Link
                        key={i}
                        href={link.url}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition ${
                            link.active
                                ? 'bg-blue-600 text-white border-blue-600'
                                : link.url
                                    ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        }`}
                        dangerouslySetInnerHTML={undefined}
                    >
                        {displayLabel}
                    </Link>
                );
            })}
        </div>
    );
}
