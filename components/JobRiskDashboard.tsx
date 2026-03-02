
import React from 'react';
import { JobCategory, JobRiskMetric } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const JobRiskDashboard: React.FC = () => {
  const jobMetrics: JobRiskMetric[] = [
    { category: JobCategory.Routine, displacement_risk: 85, growth_potential: 15, resilience_score: 10, baseline_impact: -5.2 },
    { category: JobCategory.HighSkill, displacement_risk: 30, growth_potential: 65, resilience_score: 80, baseline_impact: 2.1 },
    { category: JobCategory.Tech, displacement_risk: 15, growth_potential: 90, resilience_score: 95, baseline_impact: 4.8 },
    { category: JobCategory.Clerical, displacement_risk: 70, growth_potential: 25, resilience_score: 30, baseline_impact: -2.8 },
    { category: JobCategory.Creative, displacement_risk: 25, growth_potential: 60, resilience_score: 85, baseline_impact: 1.5 }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header>
        <h2 className="text-3xl font-black text-slate-900">Job Category Risk Dashboard</h2>
        <p className="text-slate-500 mt-2 italic">Quantifying displacement risk vs growth potential across functional tiers.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Score Bar Chart */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h4 className="text-lg font-bold mb-6 text-slate-800">Displacement Risk Score (%)</h4>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jobMetrics} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700, fill: '#475569'}} width={100} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)'}}
                />
                <Bar dataKey="displacement_risk" radius={[0, 8, 8, 0]} barSize={32}>
                  {jobMetrics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.displacement_risk > 60 ? '#f43f5e' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Impact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100">
            <span className="text-rose-600 text-[10px] font-black uppercase tracking-widest">Most At-Risk</span>
            <h5 className="text-2xl font-black text-rose-900 mt-2">{JobCategory.Routine}</h5>
            <p className="text-rose-700/70 text-sm mt-2 leading-relaxed">High susceptibility to LLM-driven process automation and robotic density integration.</p>
          </div>
          <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest">Most Growing</span>
            <h5 className="text-2xl font-black text-emerald-900 mt-2">{JobCategory.Tech}</h5>
            <p className="text-emerald-700/70 text-sm mt-2 leading-relaxed">Significant demand for AI management, infrastructure, and custom model orchestration.</p>
          </div>
          <div className="col-span-full bg-slate-900 p-8 rounded-3xl text-white shadow-xl shadow-slate-200">
             <div className="flex justify-between items-center mb-6">
                <h5 className="text-lg font-bold">Category Resilience Metrics</h5>
                <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold tracking-tighter uppercase">Aggregated Research Weights</span>
             </div>
             <div className="space-y-6">
                {jobMetrics.map(m => (
                  <div key={m.category} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400">{m.category}</span>
                      <span className="text-blue-400">{m.resilience_score}/100</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${m.resilience_score}%` }}></div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobRiskDashboard;
