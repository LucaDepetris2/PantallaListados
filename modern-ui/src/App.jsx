import React from 'react';
import { ConfigSection } from './components/sections/ConfigSection';
import { FiltersSection } from './components/sections/FiltersSection';
import { OutputSection } from './components/sections/OutputSection';

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-800 p-4">
      <div className="w-[740px] h-[580px] bg-slate-100 rounded-xl shadow-2xl flex flex-col overflow-hidden">
        <header className="px-6 py-4 bg-white border-b border-slate-200 shrink-0 text-center">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Listado de Comprobantes de Ventas</h1>
          <p className="text-xs text-slate-500 mt-0.5">Configuración y emisión de reportes</p>
        </header>

        <main className="flex-1 p-3 flex flex-col gap-2 min-h-0">

          <div className="h-[160px] shrink-0">
            <ConfigSection />
          </div>

          <div className="flex-1 min-h-0">
            <FiltersSection />
          </div>

          <div className="shrink-0">
            <OutputSection />
          </div>

        </main>
      </div>
    </div>
  );
}

export default App;
