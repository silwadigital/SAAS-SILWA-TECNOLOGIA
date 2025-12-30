import React from 'react';
import { ViewProps } from '../types';
import { ChevronRight, Check, Users, Store, DollarSign } from 'lucide-react';

export const LandingPage: React.FC<ViewProps> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 p-1.5 rounded-lg">
                <Store className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">Silwa Tecnologia</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-red-600 transition">Funcionalidades</a>
            <a href="#" className="hover:text-red-600 transition">Planos</a>
            <a href="#" className="hover:text-red-600 transition">Seja Parceiro</a>
          </div>
          <div className="flex gap-3">
             <button onClick={() => navigate('restaurant')} className="text-sm font-medium text-gray-600 hover:text-gray-900">Login</button>
             <button onClick={() => navigate('restaurant')} className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">Criar Conta Grátis</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 text-center max-w-5xl mx-auto">
        <span className="text-red-600 font-semibold tracking-wider text-sm uppercase bg-red-50 px-3 py-1 rounded-full mb-6 inline-block">
            Para Restaurantes e Delivery
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
          O Sistema de Delivery <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Mais Completo do Brasil</span>
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Tenha seu site de pedidos próprio, gestão de pedidos em tempo real e fuja das taxas abusivas dos marketplaces.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('restaurant')} className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition shadow-lg shadow-red-200 flex items-center justify-center gap-2">
                Começar Teste Grátis <ChevronRight />
            </button>
            <button onClick={() => navigate('partner')} className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-gray-400 transition flex items-center justify-center gap-2">
                <DollarSign size={20} className="text-green-600" />
                Quero Revender (Afiliados)
            </button>
        </div>
      </section>

      {/* Dashboard Preview Image */}
      <section className="max-w-6xl mx-auto px-4 mb-24">
        <div className="rounded-2xl bg-gray-900 p-2 shadow-2xl ring-1 ring-gray-900/10">
            <div className="rounded-xl overflow-hidden bg-slate-800 aspect-[16/9] relative flex items-center justify-center">
                {/* Simulated UI Mockup */}
                <div className="text-center">
                    <p className="text-slate-400 text-sm mb-2">Interface do Gestor</p>
                    <button onClick={() => navigate('restaurant')} className="text-white underline decoration-orange-500 underline-offset-4 font-semibold hover:text-orange-400">Ver Demonstração do Painel</button>
                </div>
            </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900">Tudo que você precisa para crescer</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-6">
                        <Store size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Silwa Tecnologia</h3>
                    <p className="text-gray-500 leading-relaxed">Seus clientes pedem pelo celular sem baixar app. Leve, rápido e com sua marca.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                        <Check size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Silwa Gestor de Pedidos (KDS)</h3>
                    <p className="text-gray-500 leading-relaxed">Organize sua cozinha. Receba pedidos, mande para preparo e despache com um clique.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                        <Users size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Programa de Parceiros</h3>
                    <p className="text-gray-500 leading-relaxed">Indique o sistema para outros restaurantes e ganhe comissão recorrente todo mês.</p>
                    <button onClick={() => navigate('partner')} className="mt-4 text-blue-600 font-semibold text-sm hover:underline">Saiba mais &rarr;</button>
                </div>
            </div>
        </div>
      </section>

      <footer className="bg-white py-12 border-t border-gray-100 text-center text-gray-400 text-sm">
        <p>&copy; 2024 Cardápio Web SaaS. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};