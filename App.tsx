import React, { useState } from 'react';
import { ViewState } from './types';
import { LandingPage } from './components/LandingPage';
import { RestaurantDashboard } from './components/RestaurantDashboard';
import { PartnerDashboard } from './components/PartnerDashboard';
import { ConsumerMenu } from './components/ConsumerMenu';
import { LayoutDashboard, ShoppingBag, Store, UserCheck } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  // Simple router simulation
  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage navigate={setCurrentView} />;
      case 'restaurant':
        return <RestaurantDashboard />;
      case 'partner':
        return <PartnerDashboard />;
      case 'menu':
        return <ConsumerMenu />;
      default:
        return <LandingPage navigate={setCurrentView} />;
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Main Content */}
      {renderView()}

      {/* 
        Global Navigation Switcher (Demo Only) 
        In a real app, these would be separate routes protected by auth
      */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
        <div className="bg-slate-900 text-white px-4 py-2 rounded-full shadow-xl text-xs font-bold uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Navegar Arquitetura
        </div>
        <div className="bg-white p-2 rounded-2xl shadow-2xl border border-gray-200 flex flex-col gap-2">
            <button 
                onClick={() => setCurrentView('landing')}
                className={`p-3 rounded-xl transition flex items-center gap-3 w-40 ${currentView === 'landing' ? 'bg-slate-900 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                title="Landing Page"
            >
                <Store size={18} />
                <span className="text-xs font-semibold">Institucional</span>
            </button>
            <button 
                onClick={() => setCurrentView('restaurant')}
                className={`p-3 rounded-xl transition flex items-center gap-3 w-40 ${currentView === 'restaurant' ? 'bg-orange-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                title="Restaurant Dashboard"
            >
                <LayoutDashboard size={18} />
                 <span className="text-xs font-semibold">Gestão Loja</span>
            </button>
            <button 
                onClick={() => setCurrentView('menu')}
                className={`p-3 rounded-xl transition flex items-center gap-3 w-40 ${currentView === 'menu' ? 'bg-red-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                title="Consumer Menu"
            >
                <ShoppingBag size={18} />
                 <span className="text-xs font-semibold">App Delivery</span>
            </button>
            <button 
                onClick={() => setCurrentView('partner')}
                className={`p-3 rounded-xl transition flex items-center gap-3 w-40 ${currentView === 'partner' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                title="Partner Dashboard"
            >
                <UserCheck size={18} />
                 <span className="text-xs font-semibold">Parceiros</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default App;