
import React, { useState } from 'react';
import { Sector, PredictionFeatures } from '../types';

interface PredictorFormProps {
  onPredict: (features: PredictionFeatures) => void;
  isLoading: boolean;
}

const PredictorForm: React.FC<PredictorFormProps> = ({ onPredict, isLoading }) => {
  const [form, setForm] = useState<PredictionFeatures>({
    sector: Sector.Manufacturing,
    robot_density: 120,
    ai_spending_index: 45,
    digital_adoption_index: 60,
    routine_task_share: 70,
    avg_wage: 45000,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'sector' ? value : Number(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1">Target Sector</label>
          <select 
            name="sector"
            value={form.sector}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          >
            {Object.values(Sector).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Robot Density (0-500)</label>
          <input 
            type="number" 
            name="robot_density"
            min="0" max="500"
            value={form.robot_density}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">AI Spending Index (0-100)</label>
          <input 
            type="number" 
            name="ai_spending_index"
            min="0" max="100"
            value={form.ai_spending_index}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Digital Adoption (0-100)</label>
          <input 
            type="number" 
            name="digital_adoption_index"
            min="0" max="100"
            value={form.digital_adoption_index}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Routine Task Share (%)</label>
          <input 
            type="number" 
            name="routine_task_share"
            min="0" max="100"
            value={form.routine_task_share}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1">Average Annual Wage ($)</label>
          <input 
            type="number" 
            name="avg_wage"
            min="10000" max="500000"
            value={form.avg_wage}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-[0.98] ${
          isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing Models...
          </span>
        ) : 'Analyze Dynamics'}
      </button>
    </form>
  );
};

export default PredictorForm;
