import { useState, useEffect } from 'react';
import { toJalaali, toGregorian } from 'jalaali-js';

function gregorianToJalali(gregorianDate) {
    if (!gregorianDate) return '';
    try {
        const [gy, gm, gd] = gregorianDate.split('-').map(Number);
        const { jy, jm, jd } = toJalaali(gy, gm, gd);
        return `${jy}/${String(jm).padStart(2, '0')}/${String(jd).padStart(2, '0')}`;
    } catch {
        return '';
    }
}

function jalaliToGregorian(jalaliDate) {
    if (!jalaliDate) return '';
    const parts = jalaliDate.split('/').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return '';
    const { gy, gm, gd } = toGregorian(parts[0], parts[1], parts[2]);
    return `${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`;
}

export default function JalaliDateInput({
                                            value,
                                            onChange,
                                            className = '',
                                            label,
                                            required = false,
                                            error,
                                        }) {
    const [jalali, setJalali] = useState(() => gregorianToJalali(value));

    useEffect(() => {
        setJalali(gregorianToJalali(value));
    }, [value]);

    const handleChange = (e) => {
        const val = e.target.value;
        setJalali(val);
        if (/^\d{4}\/\d{2}\/\d{2}$/.test(val)) {
            const greg = jalaliToGregorian(val);
            if (greg) onChange(greg);
        }
    };

    const handleBlur = () => {
        if (jalali && !/^\d{4}\/\d{2}\/\d{2}$/.test(jalali)) {
            setJalali(gregorianToJalali(value));
        }
    };

    return (
        <div>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            )}
            <input
                type="text"
                value={jalali}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="1405/04/23"
                dir="ltr"
                className={`w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-left ${className}`}
                required={required}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
