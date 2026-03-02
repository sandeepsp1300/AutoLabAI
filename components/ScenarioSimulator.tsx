
import React from 'react';
import { Sector, PredictionFeatures, Scenario } from '../types';

interface ScenarioSimulatorProps {
  onSimulate: (features: PredictionFeatures) => void;
}

const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({ onSimulate }) => {
  const scenarios: Scenario[] = [
    { 
      name: "Low Adoption", 
      description: "Conservative AI integration with focus on supportive tools only.",
      modifiers: { robot_density: 50, ai_spending_index: 20, digital_adoption_index: 30, routine_task_share: 15 } 
    },
    { 
      name: "Medium Adoption", 
      description: "Balanced automation path focusing on efficiency and cost reduction.",
      modifiers: { robot_density: 150, ai_spending_index: 50, digital_adoption_index: 60, routine_task_share: 45 } 
    },
    { 
      name: "High Automation", 
      description: "Aggressive displacement of routine labor through enterprise AI agents.",
      modifiers: { robot_density: 350, ai_spending_index: 85, digital_adoption_index: 90, routine_task_share: 75 } 
    },
    { 
      name: "Extreme Shock", 
      description: "Radical restructuring of labor dynamics via AGI-adjacent systems.",
      modifiers: { robot_density: 480, ai_spending_index: 98, digital_adoption_index: 99, routine_task_share: 95 } 
    }
  ];

  const runScenario = (s: Scenario) => {
    onSimulate({
      sector: Sector.Manufacturing,
      avg_wage: 55000,
      robot_density: s.modifiers.robot_density || 0,
      ai_spending_index: s.modifiers.ai_spending_index || 0,
      digital_adoption_index: s.modifiers.digital_adoption_index || 0,
      routine_task_share: s.modifiers.routine_task_share || 0
    });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-700">
      <header>
        <h2 className="text-3xl font-black text-slate-900">Automation Scenario Simulator</h2>
        <p className="text-slate-500 mt-2">Simulating labor impacts across 4 hypothetical technological adoption trajectories.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {scenarios.map((s) => (
          <div key={s.name} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-2xl hover:border-blue-200 transition-all duration-300">
            <div>
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <h4 className="text-xl font-black text-slate-800 mb-2">{s.name}</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{s.description}</p>
              <div className="space-y-3 mb-8">
                 <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase"><span>Robots</span><span className="text-slate-900">{s.modifiers.robot_density}</span></div>
                 <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase"><span>AI Spend</span><span className="text-slate-900">{s.modifiers.ai_spending_index}%</span></div>
                 <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase"><span>Routine</span><span className="text-slate-900">{s.modifiers.routine_task_share}%</span></div>
              </div>
            </div>
            <button 
              onClick={() => runScenario(s)}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95"
            >
              Simulate Reality
            </button>
          </div>
        ))}
      </div>

      <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-2xl font-black mb-4">Long-term Trend Forecasting (5Y)</h3>
            <p className="text-blue-100 leading-relaxed font-medium">Predicted annualized employment change trend based on recursive feedback of productivity gains reinvested into new job categories.</p>
          </div>
          <div className="flex items-end gap-2 h-24">
            {[10, 25, 15, 45, 30, 60, 55, 80].map((h, i) => (
              <div key={i} className="w-4 bg-blue-400 rounded-t-md animate-in slide-in-from-bottom duration-1000" style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSimulator;
