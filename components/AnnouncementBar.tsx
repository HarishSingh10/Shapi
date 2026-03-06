'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

export function AnnouncementBar() {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div className="bg-gradient-to-r from-[#D4AF37] to-[#F4CF57] text-black text-center py-2 px-4 text-xs md:text-sm font-semibold tracking-wide relative z-[60]">
            <span>🚚 Free Shipping on Orders Above ₹499 | Use Code: <strong>SAPIS10</strong> for 10% Off</span>
            <button
                onClick={() => setVisible(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
                aria-label="Close announcement"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
