/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';
import { 
  CONTAINERS, 
  BASES, 
  FILLINGS, 
  TOPPINGS, 
  OrderState, 
  Ingredient 
} from './types';
import { IngredientItem } from './components/IngredientItem';
import { CartDrawer } from './components/CartDrawer';

const STEPS = [
  { id: 1, label: 'Recipiente' },
  { id: 2, label: 'Base' },
  { id: 3, label: 'Recheio' },
  { id: 4, label: 'Finalização' },
];

export default function App() {
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState<OrderState>({
    container: null,
    base: null,
    fillings: [],
    toppings: [],
    customerName: '',
    address: '',
    complement: '',
    paymentMethod: 'Pix'
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const total = useMemo(() => {
    let sum = (order.container?.price || 0) + (order.base?.price || 0);
    order.fillings.forEach(f => sum += f.price);
    order.toppings.forEach(t => sum += t.price);
    return sum;
  }, [order]);

  const toggleItem = (category: 'fillings' | 'toppings', item: Ingredient) => {
    setOrder(prev => {
      const list = prev[category];
      const exists = list.find(i => i.id === item.id);
      if (exists) {
        return { ...prev, [category]: list.filter(i => i.id !== item.id) };
      }
      return { ...prev, [category]: [...list, item] };
    });
  };

  const removeItem = (category: string, id: string) => {
    if (category === 'filling') {
      setOrder(prev => ({ ...prev, fillings: prev.fillings.filter(i => i.id !== id) }));
    } else if (category === 'topping') {
      setOrder(prev => ({ ...prev, toppings: prev.toppings.filter(i => i.id !== id) }));
    }
  };

  const handleCheckout = (data: any) => {
    const orderId = Math.floor(1000 + Math.random() * 9000);
    const fillingsStr = order.fillings.map(f => f.name).join(', ');
    const toppingsStr = order.toppings.map(t => t.name).join(', ');
    
    const message = `*NOVO PEDIDO DALLAS #${orderId}*\n` +
      `---\n` +
      `*${order.container?.name} personalizado*\n` +
      `- *Base:* ${order.base?.name}\n` +
      `- *Recheio:* ${fillingsStr || 'Nenhum'}\n` +
      `- *Finalização:* ${toppingsStr || 'Nenhum'}\n` +
      `---\n` +
      `*Total:* R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n` +
      `*Cliente:* ${data.name}\n` +
      `*Entrega:* ${data.address}\n` +
      `*Complemento:* ${data.complement || 'N/A'}\n` +
      `*Pagamento:* ${data.payment}`;
    
    window.open(`https://api.whatsapp.com/send?phone=5591991883384&text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-offwhite">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-deep rounded-lg flex items-center justify-center text-white font-bold text-lg md:text-xl">D</div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-brand-deep">Açaiteria Dallas</h1>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="group flex items-center gap-2 md:gap-4 px-4 md:px-6 py-2 md:py-3 glass rounded-full hover:bg-brand-deep hover:text-white transition-smooth"
          >
            <div className="flex flex-col items-end">
              <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-60">Meu Carrinho</span>
              <span className="text-xs md:text-sm font-bold">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <ShoppingBag size={18} className="md:w-5 md:h-5" />
          </button>
        </div>

        {/* Step Progress Line */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-3 md:pb-4">
          <div className="relative h-1 bg-black/5 rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-brand-deep"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / STEPS.length) * 100}%` }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {STEPS.map((s) => (
              <button
                key={s.id}
                onClick={() => setStep(s.id)}
                className={`text-[8px] md:text-[10px] font-bold uppercase tracking-widest transition-smooth ${
                  step === s.id ? 'text-brand-deep' : 'text-black/30'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 pt-32 md:pt-40 pb-40 px-4 md:px-8">
        <section className="max-w-5xl mx-auto space-y-8 md:space-y-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand-deep/40 font-bold text-[10px] md:text-xs uppercase tracking-widest">
              <span>Passo 0{step}</span>
              <div className="w-8 h-px bg-brand-deep/20" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              {STEPS[step - 1].label}
            </h2>
          </div>

          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8"
              >
                {step === 1 && CONTAINERS.map(item => (
                  <IngredientItem 
                    key={item.id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    isHero
                    isSelected={order.container?.id === item.id}
                    onClick={() => { setOrder(prev => ({ ...prev, container: item })); setStep(2); }}
                  />
                ))}

                {step === 2 && BASES.map(item => (
                  <IngredientItem 
                    key={item.id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    isSelected={order.base?.id === item.id}
                    onClick={() => { setOrder(prev => ({ ...prev, base: item })); setStep(3); }}
                  />
                ))}

                {step === 3 && FILLINGS.map(item => (
                  <IngredientItem 
                    key={item.id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    isSelected={!!order.fillings.find(i => i.id === item.id)}
                    onClick={() => toggleItem('fillings', item)}
                  />
                ))}

                {step === 4 && TOPPINGS.map(item => (
                  <IngredientItem 
                    key={item.id}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    isSelected={!!order.toppings.find(i => i.id === item.id)}
                    onClick={() => toggleItem('toppings', item)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Sticky Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 p-4 md:p-8 bg-white/80 backdrop-blur-xl border-t border-black/5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 md:gap-8">
          <button 
            onClick={() => setStep(s => Math.max(s - 1, 1))}
            className={`p-3 md:p-4 rounded-xl md:rounded-2xl glass transition-smooth ${step === 1 ? 'opacity-0 pointer-events-none' : 'hover:bg-black/5'}`}
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6" />
          </button>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="text-right">
              <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-black/40">Total Atual</p>
              <p className="text-xl md:text-3xl font-bold text-brand-deep">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
            {step < 4 ? (
              <button 
                onClick={() => setStep(s => Math.min(s + 1, 4))}
                disabled={step === 1 && !order.container || step === 2 && !order.base}
                className="bg-brand-deep text-white px-6 md:px-10 py-3 md:py-5 rounded-xl md:rounded-2xl font-bold text-sm md:text-base flex items-center gap-2 md:gap-3 hover:bg-brand-accent transition-smooth shadow-xl shadow-brand-deep/20 disabled:opacity-50"
              >
                Próximo <ChevronRight size={18} className="md:w-5 md:h-5" />
              </button>
            ) : (
              <button 
                onClick={() => setIsCartOpen(true)}
                className="bg-brand-deep text-white px-6 md:px-10 py-3 md:py-5 rounded-xl md:rounded-2xl font-bold text-sm md:text-base flex items-center gap-2 md:gap-3 hover:bg-brand-accent transition-smooth shadow-xl shadow-brand-deep/20"
              >
                Revisar <ShoppingBag size={18} className="md:w-5 md:h-5" />
              </button>
            )}
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        order={order}
        total={total}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

