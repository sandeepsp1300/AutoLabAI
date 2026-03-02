
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ScatterChart, Scatter, ZAxis, Cell, PieChart, Pie
} from 'recharts';
import { AutomationData, Sector } from '../types';

interface AnalyticsProps {
  data: AutomationData[];
}

const Analytics: React.FC<AnalyticsProps> = ({ data }) => {
  // Aggregate data by sector
  const sectorAverages = Object.values(Sector).map(sector => {
    const sectorData = data.filter(d => d.sector === sector);
    const avgChange = sectorData.reduce((acc, curr) => acc + curr.employment_change_percent, 0) / sectorData.length;
    const avgSpending = sectorData.reduce((acc, curr) => acc + curr.ai_spending_index, 0) / sectorData.length;
    return {
      sector,
      avgChange: parseFloat(avgChange.toFixed(2)),
      avgSpending: parseFloat(avgSpending.toFixed(2))
    };
  });

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">Observation Count</p>
          <h3 className="text-2xl font-extrabold text-blue-900">{data.length} records</h3>
        </div>
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
          <p className="text-emerald-600 text-xs font-bold uppercase tracking-wider mb-1">Max Positive Change</p>
          <h3 className="text-2xl font-extrabold text-emerald-900">+{Math.max(...data.map(d => d.employment_change_percent))}%</h3>
        </div>
        <div className="bg-rose-50 p-4 rounded-xl border border-rose-100">
          <p className="text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">Max Displacement</p>
          <h3 className="text-2xl font-extrabold text-rose-900">{Math.min(...data.map(d => d.employment_change_percent))}%</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sectoral Impact Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-semibold mb-6 text-slate-800">Employment Change by Sector (%)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorAverages}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="sector" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="avgChange" radius={[4, 4, 0, 0]}>
                  {sectorAverages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.avgChange < 0 ? '#f43f5e' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Correlation: Routine Task Share vs Change */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <h3 className="text-lg font-semibold mb-6 text-slate-800">Routine Task Share vs Impact</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" dataKey="routine_task_share" name="Routine Task %" unit="%" axisLine={false} tickLine={false} />
                <YAxis type="number" dataKey="employment_change_percent" name="Change %" unit="%" axisLine={false} tickLine={false} />
                <ZAxis type="number" range={[50, 400]} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Scatter name="Observations" data={data.slice(0, 150)} fill="#3b82f6" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
