import React from 'react';
import type { Beer } from '../data/beers';

export interface AllergenBadgeProps {
  allergens?: string[];
  allergenNote?: string;
  beer?: Beer;
  variant?: 'full' | 'compact';
  className?: string;
}

export const AllergenBadge: React.FC<AllergenBadgeProps> = ({
  allergens,
  allergenNote,
  beer,
  variant = 'full',
  className = '',
}) => {
  const allergenList = allergens ?? beer?.allergens ?? ['Orzo'];
  const note = allergenNote ?? beer?.allergenNote;
  const uppercaseAllergens = allergenList.map((a) => a.toUpperCase()).join(', ');

  if (variant === 'compact') {
    return (
      <div
        className={`text-xs text-white/90 font-medium leading-relaxed ${className}`}
        aria-label={`Allergeni: Contiene ${uppercaseAllergens} (glutine)`}
      >
        <span>Contiene: </span>
        <strong className="font-bold text-[#D4A24E] tracking-wide">
          {uppercaseAllergens}
        </strong>{' '}
        <span className="text-white/80 font-normal">(glutine)</span>
        {note && (
          <span className="block text-xs text-white/70 mt-0.5 leading-tight">
            {note}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col text-left ${className}`}
      aria-label={`Allergeni: Contiene cereali con glutine: ${uppercaseAllergens}`}
    >
      <span className="text-xs font-bold uppercase opacity-75 block tracking-widest mb-1 text-white/80">
        ALLERGENI
      </span>
      <div className="text-[13px] md:text-sm text-white leading-snug font-medium">
        <span>Contiene cereali con glutine: </span>
        <strong className="font-bold text-[#D4A24E] tracking-wide">
          {uppercaseAllergens}
        </strong>
      </div>
      {note && (
        <span className="text-xs text-white/70 mt-1 leading-tight">
          {note}
        </span>
      )}
    </div>
  );
};

export default AllergenBadge;
