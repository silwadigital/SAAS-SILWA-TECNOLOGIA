import React, { useState, useEffect } from 'react';
import { Order, OrderStatus } from '../types';
import { generateDishDescription } from '../services/geminiService';
import { ChefHat, Clock, CheckCircle, Truck, Sparkles, Utensils, AlertCircle } from 'lucide-react';

const MOCK_ORDERS: Order[] = [
  { id: '#8921', customerName: 'Ana Silva', items: [{ name: 'Pizza Calabresa', quantity: 1 }], total: 42.00, status: OrderStatus.PENDING, timestamp: new Date() },
  { id: '#8922', customerName: 'Bruno Souza', items: [{ name: 'X-Bacon', quantity: 2 }, { name: 'Coca-Cola', quantity: 2 }], total: 78.00, status: OrderStatus.PREPARING, timestamp: new Date(Date.now() - 1000 * 60 * 15) },
  { id: '#8923', customerName: 'Carla Dias', items: [{ name: 'Açaí 500ml', quantity: 1 }], total: 22.00, status: OrderStatus.DELIVERY, timestamp: new Date(Date.now() - 1000 * 60 * 45) },
];

export const RestaurantDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kds' | 'menu'>('kds');
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  // Gemini State
  const [dishName, setDishName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [generatedDesc, setGeneratedDesc] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateDescription = async () => {
    if (!dishName || !ingredients) return;
    setIsGenerating(true);
    const desc = await generateDishDescription(dishName, ingredients);
    setGeneratedDesc(desc);
    setIsGenerating(false);
  };

  const advanceOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => {
        if (o.id !== orderId) return o;
        const nextStatus = 
            o.status === OrderStatus.PENDING ? OrderStatus.ACCEPTED :
            o.status === OrderStatus.ACCEPTED ? OrderStatus.PREPARING :
            o.status === OrderStatus.PREPARING ? OrderStatus.DELIVERY :
            OrderStatus.COMPLETED;
        return { ...o, status: nextStatus };
    }));
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
            <div className="p-6 border-b border-slate-700">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Utensils className="text-orange-500" />
                    Gestor Pro
                </h2>
                <p className="text-xs text-slate-400 mt-1">Pizzaria do João</p>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <button onClick={() => setActiveTab('kds')} className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${activeTab === 'kds' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                    <Clock size={20} />
                    Pedidos (KDS)
                </button>
                <button onClick={() => setActiveTab('menu')} className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${activeTab === 'menu' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                    <ChefHat size={20} />
                    Cardápio AI
                </button>
            </nav>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <header className="bg-white shadow-sm p-4 flex justify-between items-center md:hidden">
                <h2 className="font-bold text-slate-800">Gestor Pro</h2>
                <div className="flex gap-2">
                    <button onClick={() => setActiveTab('kds')} className={`p-2 rounded ${activeTab === 'kds' ? 'bg-slate-100' : ''}`}><Clock size={20}/></button>
                    <button onClick={() => setActiveTab('menu')} className={`p-2 rounded ${activeTab === 'menu' ? 'bg-slate-100' : ''}`}><ChefHat size={20}/></button>
                </div>
            </header>

            <main className="flex-1 overflow-auto p-6">
                {activeTab === 'kds' ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Pending Column */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full max-h-[80vh]">
                            <div className="p-4 border-b border-slate-100 bg-red-50 rounded-t-xl">
                                <h3 className="font-bold text-red-700 flex items-center gap-2"><AlertCircle size={18}/> Pendentes</h3>
                            </div>
                            <div className="p-4 space-y-4 overflow-y-auto">
                                {orders.filter(o => o.status === OrderStatus.PENDING || o.status === OrderStatus.ACCEPTED).map(order => (
                                    <div key={order.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-mono font-bold text-slate-700">{order.id}</span>
                                            <span className="text-xs text-slate-400">{order.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                        </div>
                                        <p className="font-semibold text-slate-800 mb-1">{order.customerName}</p>
                                        <ul className="text-sm text-slate-600 mb-3 space-y-1">
                                            {order.items.map((item, idx) => (
                                                <li key={idx} className="flex justify-between">
                                                    <span>{item.quantity}x {item.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => advanceOrder(order.id)}
                                                className="flex-1 bg-red-600 text-white py-2 rounded-md text-sm font-medium hover:bg-red-700 transition"
                                            >
                                                {order.status === OrderStatus.PENDING ? 'Aceitar' : 'Iniciar Preparo'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Preparing Column */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full max-h-[80vh]">
                             <div className="p-4 border-b border-slate-100 bg-orange-50 rounded-t-xl">
                                <h3 className="font-bold text-orange-700 flex items-center gap-2"><ChefHat size={18}/> Em Preparo</h3>
                            </div>
                            <div className="p-4 space-y-4 overflow-y-auto">
                                {orders.filter(o => o.status === OrderStatus.PREPARING).map(order => (
                                    <div key={order.id} className="bg-white border-l-4 border-orange-500 rounded-r-lg p-4 shadow-sm">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-bold">{order.id}</span>
                                        </div>
                                        <p className="mb-2 text-sm">{order.customerName}</p>
                                        <button onClick={() => advanceOrder(order.id)} className="w-full mt-2 py-2 border border-orange-500 text-orange-600 rounded hover:bg-orange-50 text-sm font-medium">
                                            Pronto para Entrega
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                         {/* Delivery Column */}
                         <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full max-h-[80vh]">
                             <div className="p-4 border-b border-slate-100 bg-green-50 rounded-t-xl">
                                <h3 className="font-bold text-green-700 flex items-center gap-2"><Truck size={18}/> Em Entrega</h3>
                            </div>
                            <div className="p-4 space-y-4 overflow-y-auto">
                                {orders.filter(o => o.status === OrderStatus.DELIVERY).map(order => (
                                    <div key={order.id} className="bg-white border border-green-100 rounded-lg p-4 shadow-sm opacity-90">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-bold text-green-800">{order.id}</span>
                                        </div>
                                        <p className="mb-2 text-sm">{order.customerName}</p>
                                        <button onClick={() => advanceOrder(order.id)} className="w-full mt-2 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium">
                                            Concluir Pedido
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    // Menu AI Tab
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full">
                                    <Sparkles size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">Assistente de Cardápio com IA</h2>
                                    <p className="text-slate-500">Use o Gemini para criar descrições irresistíveis.</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Prato</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="Ex: Hambúrguer Trufado"
                                        value={dishName}
                                        onChange={(e) => setDishName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Ingredientes Principais</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="Ex: Carne 180g, maionese de trufas, queijo brie"
                                        value={ingredients}
                                        onChange={(e) => setIngredients(e.target.value)}
                                    />
                                </div>

                                <button 
                                    onClick={handleGenerateDescription}
                                    disabled={isGenerating || !dishName}
                                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition flex justify-center items-center gap-2 disabled:opacity-50"
                                >
                                    {isGenerating ? (
                                        <>Gerando...</>
                                    ) : (
                                        <><Sparkles size={18} /> Gerar Descrição Mágica</>
                                    )}
                                </button>

                                {generatedDesc && (
                                    <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-lg animate-fade-in">
                                        <h4 className="text-sm font-bold text-indigo-800 mb-2">Sugestão do Gemini:</h4>
                                        <p className="text-slate-700 italic">"{generatedDesc}"</p>
                                        <div className="mt-3 flex gap-2">
                                            <button className="text-xs bg-white border border-indigo-200 px-3 py-1 rounded hover:bg-indigo-100 text-indigo-700 transition">Copiar</button>
                                            <button onClick={handleGenerateDescription} className="text-xs text-indigo-600 hover:underline">Tentar de novo</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    </div>
  );
};