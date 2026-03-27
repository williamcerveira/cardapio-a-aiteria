export interface Ingredient {
  id: string;
  name: string;
  image: string;
  price: number;
  category: 'container' | 'base' | 'filling' | 'topping';
}

export interface OrderState {
  container: Ingredient | null;
  base: Ingredient | null;
  fillings: Ingredient[];
  toppings: Ingredient[];
  customerName: string;
  address: string;
  complement: string;
  paymentMethod: string;
}

export const CONTAINERS: Ingredient[] = [
  { id: 'copo-300', name: 'Copo 300ml', image: '/assets/images/containers/copo-300.png', price: 15, category: 'container' },
  { id: 'copo-500', name: 'Copo 500ml', image: '/assets/images/containers/copo-500.png', price: 22, category: 'container' },
  { id: 'copo-700', name: 'Copo 700ml', image: '/assets/images/containers/copo-700.png', price: 28, category: 'container' },
  { id: 'tigela-700', name: 'Tigela 700ml', image: '/assets/images/containers/tigela-700.png', price: 32, category: 'container' },
  { id: 'barca-1000', name: 'Barca Dallas', image: '/assets/images/containers/barca-1000.png', price: 58, category: 'container' },
];

export const BASES: Ingredient[] = [
  { id: 'acai-tradicional', name: 'Açaí Tradicional', image: '/assets/images/bases/acai-tradicional.png', price: 0, category: 'base' },
  { id: 'acai-zero', name: 'Açaí Zero Açúcar', image: '/assets/images/bases/acai-zero.png', price: 0, category: 'base' },
  { id: 'acai-banana', name: 'Açaí com Banana', image: '/assets/images/bases/acai-banana.png', price: 2, category: 'base' },
  { id: 'sorvete-ninho', name: 'Sorvete de Ninho', image: '/assets/images/bases/sorvete-ninho.png', price: 5, category: 'base' },
  { id: 'sorvete-morango', name: 'Sorvete de Morango', image: '/assets/images/bases/sorvete-morango.png', price: 5, category: 'base' },
];

export const FILLINGS: Ingredient[] = [
  { id: 'pistache', name: 'Creme de Pistache', image: '/assets/images/fillings/pistache.png', price: 8, category: 'filling' },
  { id: 'morango', name: 'Morangos Frescos', image: '/assets/images/fillings/morango.png', price: 4, category: 'filling' },
  { id: 'nutella', name: 'Nutella Original', image: '/assets/images/fillings/nutella.png', price: 6, category: 'filling' },
  { id: 'creme-ninho', name: 'Creme de Ninho', image: '/assets/images/fillings/creme-ninho.png', price: 5, category: 'filling' },
  { id: 'uva', name: 'Uva Sem Semente', image: '/assets/images/fillings/uva.png', price: 4, category: 'filling' },
  { id: 'kiwi', name: 'Kiwi', image: '/assets/images/fillings/kiwi.png', price: 4, category: 'filling' },
];

export const TOPPINGS: Ingredient[] = [
  { id: 'granola-artesanal', name: 'Granola Artesanal', image: '/assets/images/toppings/granola.png', price: 3, category: 'topping' },
  { id: 'leite-ninho', name: 'Leite Ninho', image: '/assets/images/toppings/leite-ninho.png', price: 3, category: 'topping' },
  { id: 'mel-silvestre', name: 'Mel Silvestre', image: '/assets/images/toppings/mel.png', price: 3, category: 'topping' },
  { id: 'pacoca', name: 'Paçoca', image: '/assets/images/toppings/pacoca.png', price: 2, category: 'topping' },
  { id: 'ovomaltine', name: 'Ovomaltine', image: '/assets/images/toppings/ovomaltine.png', price: 3, category: 'topping' },
  { id: 'leite-condensado', name: 'Leite Condensado', image: '/assets/images/toppings/leite-condensado.png', price: 2, category: 'topping' },
];
