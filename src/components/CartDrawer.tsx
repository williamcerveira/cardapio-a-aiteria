import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, MapPin, CreditCard, ArrowRight, Trash2 } from 'lucide-react';
import { OrderState } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderState;
  total: number;
  onRemoveItem: (category: string, id: string) => void;
  onCheckout: (customerData: { name: string; address: string; complement: string; payment: string }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  order, 
  total, 
  onRemoveItem,
  onCheckout
}) => {
  const [step, setStep] = useState<'review' | 'checkout'>('review');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    complement: '',
    payment: 'Cartão de Crédito'
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-graphite/60 backdrop-blur-md z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-black/5">
              <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3">
                <ShoppingBag className="text-brand-deep" /> 
                {step === 'review' ? 'Seu Pedido' : 'Finalizar'}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-smooth">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <AnimatePresence mode="wait">
                {step === 'review' ? (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6 md:space-y-8"
                  >
                    {/* Container */}
                    {order.container && (
                      <div className="flex justify-between items-center group">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold mb-1">Recipiente</p>
                          <p className="font-bold text-base md:text-lg">{order.container.name}</p>
                        </div>
                        <p className="font-bold">R$ {order.container.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                      </div>
                    )}

                    {/* Base */}
                    {order.base && (
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold mb-1">Base</p>
                          <p className="font-bold text-base md:text-lg">{order.base.name}</p>
                        </div>
                        <p className="font-bold">R$ {order.base.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                      </div>
                    )}

                    {/* Fillings */}
                    {order.fillings.length > 0 && (
                      <div className="space-y-3 md:space-y-4">
                        <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Recheios</p>
                        {order.fillings.map(item => (
                          <div key={item.id} className="flex justify-between items-center group">
                            <p className="font-medium text-sm md:text-base">{item.name}</p>
                            <div className="flex items-center gap-4">
                              <p className="font-bold text-sm md:text-base">R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                              <button 
                                onClick={() => onRemoveItem('filling', item.id)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded transition-smooth"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Toppings */}
                    {order.toppings.length > 0 && (
                      <div className="space-y-3 md:space-y-4">
                        <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Finalização</p>
                        {order.toppings.map(item => (
                          <div key={item.id} className="flex justify-between items-center group">
                            <p className="font-medium text-sm md:text-base">{item.name}</p>
                            <div className="flex items-center gap-4">
                              <p className="font-bold text-sm md:text-base">R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                              <button 
                                onClick={() => onRemoveItem('topping', item.id)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded transition-smooth"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="checkout"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-5 md:space-y-6"
                  >
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Nome Completo</label>
                      <input 
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full border-b border-black/10 p-2 focus:outline-none focus:border-brand-deep transition-smooth font-medium"
                        placeholder="Seu nome"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Endereço Completo</label>
                      <input 
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full border-b border-black/10 p-2 focus:outline-none focus:border-brand-deep transition-smooth font-medium"
                        placeholder="Rua, número, bairro"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Complemento</label>
                      <input 
                        type="text"
                        value={formData.complement}
                        onChange={(e) => setFormData(prev => ({ ...prev, complement: e.target.value }))}
                        className="w-full border-b border-black/10 p-2 focus:outline-none focus:border-brand-deep transition-smooth font-medium"
                        placeholder="Apto, bloco, referência"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 flex items-center gap-1">
                        <CreditCard size={10} /> Forma de Pagamento
                      </label>
                      <select 
                        value={formData.payment}
                        onChange={(e) => setFormData(prev => ({ ...prev, payment: e.target.value }))}
                        className="w-full border-b border-black/10 p-2 focus:outline-none focus:border-brand-deep transition-smooth font-medium bg-transparent"
                      >
                        <option>Cartão de Crédito</option>
                        <option>Cartão de Débito</option>
                        <option>Pix</option>
                        <option>Dinheiro</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-6 md:p-8 border-t border-black/5 bg-brand-offwhite/50">
              <div className="flex justify-between items-end mb-6 md:mb-8">
                <span className="text-black/40 font-bold uppercase tracking-widest text-[10px]">Total</span>
                <span className="text-3xl md:text-4xl font-bold text-brand-deep">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>

              {step === 'review' ? (
                <button
                  onClick={() => setStep('checkout')}
                  disabled={!order.container || !order.base}
                  className="w-full bg-brand-deep text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-accent transition-smooth shadow-lg shadow-brand-deep/20 disabled:opacity-50"
                >
                  Continuar para Entrega <ArrowRight size={20} />
                </button>
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep('review')}
                    className="px-4 md:px-6 border border-brand-deep text-brand-deep rounded-xl md:rounded-2xl font-bold hover:bg-brand-deep/5 transition-smooth"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={() => onCheckout(formData)}
                    disabled={!formData.name || !formData.address}
                    className="flex-1 bg-brand-deep text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-accent transition-smooth shadow-lg shadow-brand-deep/20 disabled:opacity-50"
                  >
                    Confirmar Pedido
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
