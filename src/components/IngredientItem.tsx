import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface IngredientItemProps {
  name: string;
  image: string;
  price: number;
  isSelected: boolean;
  onClick: () => void;
  isHero?: boolean;
}

export const IngredientItem: React.FC<IngredientItemProps> = ({
  name,
  image,
  price,
  isSelected,
  onClick,
  isHero = false
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative flex flex-col items-center transition-smooth group ${isHero ? 'w-full' : 'w-full'
        }`}
    >
      <div className={`relative overflow-hidden transition-smooth ${isHero
          ? 'aspect-[4/5] w-full rounded-[2rem] mb-4'
          : 'w-24 h-24 rounded-full mb-3'
        } ${isSelected ? 'ring-2 ring-brand-deep ring-offset-4' : 'ring-1 ring-black/5'
        }`}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-brand-deep/20 flex items-center justify-center backdrop-blur-[2px]"
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Check className="text-brand-deep" size={18} strokeWidth={3} />
            </div>
          </motion.div>
        )}
      </div>

      <div className="text-center">
        <h3 className={`font-bold text-brand-graphite ${isHero ? 'text-xl' : 'text-sm'}`}>
          {name}
        </h3>
        <p className="text-xs font-medium text-brand-deep/60 mt-0.5">
          {price === 0 ? 'Incluso' : `+ R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
        </p>
      </div>
    </motion.button>
  );
};
