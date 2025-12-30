import React, { useState } from 'react';
import { MenuItem } from '../types';
import { ShoppingBag, Plus, Minus, Search, Star } from 'lucide-react';

const MOCK_MENU: MenuItem[] = [
  {
    id: '1',
    name: 'X-Bacon Artesanal',
    description: 'Pão brioche, burger 180g, queijo cheddar inglês e bacon crocante.',
    price: 32.90,
    category: 'Burgers',
    image: 'https://picsum.photos/400/300?random=1'
  },
  {
    id: '2',
    name: 'Pizza Margherita',
    description: 'Molho de tomate pelati, mozzarella de búfala e manjericão fresco.',
    price: 45.00,
    category: 'Pizzas',
    image: 'https://picsum.photos/400/300?random=2'
  },
  {
    id: '3',
    name: 'Coca-Cola Lata',
    description: 'Lata 350ml gelada.',
    price: 6.00,
    category: 'Bebidas',
    image: 'https://picsum.photos/400/300?random=3'
  },
  {
    id: '4',
    name: 'Batata Rústica',
    description: 'Batatas cortadas grosseiramente com alecrim e alho.',
    price: 18.50,
    category: 'Acompanhamentos',
    image: 'https://picsum.photos/400/300?random=4'
  }
];

export const ConsumerMenu: React.FC = () => {
  const [cart, setCart] = useState<{id: string, qtd: number}[]>([]);
  const [category, setCategory] = useState('Todos');

  const addToCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, qtd: item.qtd + 1 } : item);
      }
      return [...prev, { id, qtd: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qtd: Math.max(0, item.qtd - 1) } : item).filter(i => i.qtd > 0));
  };

  const totalItems = cart.reduce((acc, curr) => acc + curr.qtd, 0);
  const totalPrice = cart.reduce((acc, curr) => {
    const item = MOCK_MENU.find(i => i.id === curr.id);
    return acc + (item ? item.price * curr.qtd : 0);
  }, 0);

  const categories = ['Todos', ...Array.from(new Set(MOCK_MENU.map(i => i.category)))];
  const filteredMenu = category === 'Todos' ? MOCK_MENU : MOCK_MENU.filter(i => i.category === category);

  return (
    <div className="bg-white min-h-screen pb-24 relative max-w-md mx-auto shadow-2xl overflow-hidden border-x border-gray-100">
      {/* Header */}
      <div className="bg-red-600 p-4 pb-12 rounded-b-3xl shadow-lg relative z-10">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-white font-bold text-xl">Pizzaria do João</h1>
            <div className="bg-white/20 p-2 rounded-full text-white">
                <Search size={20} />
            </div>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-md flex items-center gap-3">
            <img src="https://picsum.photos/50/50?random=10" className="w-10 h-10 rounded-full object-cover" alt="Logo" />
            <div>
                <p className="text-xs text-gray-500">Aberto até 23:00</p>
                <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" /> 4.8 (120 avaliações)
                </div>
            </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto p-4 -mt-6 relative z-20 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors shadow-sm ${
              category === cat ? 'bg-red-600 text-white' : 'bg-white text-gray-600 border border-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu List */}
      <div className="px-4 pb-4 space-y-6">
        {filteredMenu.map(item => {
           const inCart = cart.find(c => c.id === item.id)?.qtd || 0;
           return (
            <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-6 last:border-0">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover shadow-sm bg-gray-100" />
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                        <p className="text-xs text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                        <span className="font-bold text-gray-900">R$ {item.price.toFixed(2)}</span>
                        
                        {inCart > 0 ? (
                            <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-2 py-1">
                                <button onClick={() => removeFromCart(item.id)} className="text-red-600"><Minus size={16} /></button>
                                <span className="text-sm font-semibold w-4 text-center">{inCart}</span>
                                <button onClick={() => addToCart(item.id)} className="text-red-600"><Plus size={16} /></button>
                            </div>
                        ) : (
                            <button onClick={() => addToCart(item.id)} className="bg-gray-900 text-white p-2 rounded-lg hover:bg-gray-800 transition">
                                <Plus size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
           );
        })}
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <div className="fixed bottom-4 left-0 right-0 px-4 max-w-md mx-auto z-50">
          <button className="w-full bg-red-600 text-white p-4 rounded-xl shadow-xl flex justify-between items-center hover:bg-red-700 transition transform hover:-translate-y-1">
            <div className="flex items-center gap-3">
                <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {totalItems}
                </div>
                <span className="font-medium">Ver Sacola</span>
            </div>
            <div className="flex items-center gap-2 font-bold">
                <span>R$ {totalPrice.toFixed(2)}</span>
                <ShoppingBag size={20} />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};