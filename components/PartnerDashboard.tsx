import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PartnerStats } from '../types';
import { Wallet, Users, ArrowUpRight, Copy, Lightbulb, Store } from 'lucide-react';
import { generatePartnerInsight } from '../services/geminiService';

const MOCK_STATS: PartnerStats = {
  totalReferrals: 124,
  activeStores: 15,
  pendingCommission: 1250.00,
  paidCommission: 4500.00,
  history: [
    { month: 'Jan', amount: 800 },
    { month: 'Fev', amount: 1200 },
    { month: 'Mar', amount: 950 },
    { month: 'Abr', amount: 1500 },
    { month: 'Mai', amount: 1800 },
    { month: 'Jun', amount: 2400 },
  ]
};

export const PartnerDashboard: React.FC = () => {
  const [insight, setInsight] = useState<string>('');
  
  useEffect(() => {
    // Generate AI insight on load
    const fetchInsight = async () => {
      const text = await generatePartnerInsight(MOCK_STATS);
      setInsight(text);
    };
    fetchInsight();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Portal do Parceiro</h1>
            <p className="text-gray-500">Olá, Carlos! Veja seus ganhos recorrentes.</p>
          </div>
          <div className="flex gap-3">
             <div className="bg-white p-2 px-4 rounded-full border border-gray-200 flex items-center gap-2 text-sm shadow-sm cursor-pointer hover:bg-gray-50 transition">
                <span className="text-gray-500">Seu link:</span>
                <span className="font-mono text-blue-600 font-semibold">parceiro.app/carlos123</span>
                <Copy size={14} className="text-gray-400" />
             </div>
          </div>
        </header>

        {/* AI Insight Card */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex items-start gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                    <Lightbulb className="text-yellow-300" />
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-1">Dica de Crescimento (IA)</h3>
                    <p className="text-blue-100 leading-relaxed max-w-2xl">
                        {insight || "Analisando seus dados..."}
                    </p>
                </div>
            </div>
            {/* Abstract Shape */}
            <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12"></div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-green-100 p-2 rounded-lg text-green-600"><Wallet size={20}/></div>
                    <span className="bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">+12% <ArrowUpRight size={12}/></span>
                </div>
                <p className="text-gray-500 text-sm">Comissão Pendente</p>
                <h3 className="text-2xl font-bold text-gray-900">R$ {MOCK_STATS.pendingCommission.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</h3>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Store size={20}/></div>
                </div>
                <p className="text-gray-500 text-sm">Lojas Ativas</p>
                <h3 className="text-2xl font-bold text-gray-900">{MOCK_STATS.activeStores}</h3>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><Users size={20}/></div>
                </div>
                <p className="text-gray-500 text-sm">Indicações Totais</p>
                <h3 className="text-2xl font-bold text-gray-900">{MOCK_STATS.totalReferrals}</h3>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 opacity-70">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-gray-100 p-2 rounded-lg text-gray-600"><Wallet size={20}/></div>
                </div>
                <p className="text-gray-500 text-sm">Total Já Sacado</p>
                <h3 className="text-2xl font-bold text-gray-900">R$ {MOCK_STATS.paidCommission.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</h3>
            </div>
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-6">Histórico de Comissões</h3>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={MOCK_STATS.history}>
                            <defs>
                                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} tickFormatter={(value) => `R$${value}`} />
                            <Tooltip 
                                contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}}
                                itemStyle={{color: '#fff'}}
                            />
                            <Area type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">Últimas Indicações</h3>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                             <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                                PZ
                             </div>
                             <div className="flex-1">
                                <p className="font-semibold text-sm text-gray-900">Pizzaria {i}</p>
                                <p className="text-xs text-gray-500">Plano Premium</p>
                             </div>
                             <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Ativo</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};