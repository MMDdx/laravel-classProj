import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    return (
        <div className="mt-4 flex flex-wrap gap-1">
            {links.map((link, index) =>
                link.url ? (
                    <Link
                        key={index}
                        href={link.url}
                        className={`px-3 py-1 rounded text-sm ${
                            link.active
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ) : (
                    <span
                        key={index}
                        className="px-3 py-1 rounded text-sm text-gray-400"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                )
            )}
        </div>
    );
}
