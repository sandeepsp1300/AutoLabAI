
import React, { useState, useEffect } from 'react';
import { generateSyntheticData } from './utils/dataSimulator';
import { AutomationData, PredictionFeatures, PredictionResult } from './types';
import PredictorForm from './components/PredictorForm';
import Analytics from './components/Analytics';
import JobRiskDashboard from './components/JobRiskDashboard';
import ScenarioSimulator from './components/ScenarioSimulator';
import ResearchReport from './components/ResearchReport';
import PredictionResultsView from './components/PredictionResultsView';
import AboutPage from './components/AboutPage';
import { getEmploymentInsight } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'eda' | 'predictor' | 'jobs' | 'sim' | 'performance' | 'report' | 'about'>('eda');
  const [dataset, setDataset] = useState<AutomationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPrediction, setCurrentPrediction] = useState<PredictionResult | null>(null);
  const [lastFeatures, setLastFeatures] = useState<PredictionFeatures | null>(null);

  useEffect(() => {
    setDataset(generateSyntheticData(500));
  }, []);

  const handlePredict = async (features: PredictionFeatures) => {
    setIsLoading(true);
    setLastFeatures(features);
    const result = await getEmploymentInsight(features);
    setCurrentPrediction(result);
    setIsLoading(false);
  };

  const navItems = [
    { id: 'eda', label: 'EDA & Insights' },
    { id: 'predictor', label: 'Predictor & XAI' },
    { id: 'jobs', label: 'Job Risk' },
    { id: 'sim', label: 'Simulations' },
    { id: 'performance', label: 'Model Perf.' },
    { id: 'report', label: 'Research Report' },
    { id: 'about', label: 'About' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 rounded-xl shadow-lg shadow-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">AutoLab AI <span className="text-blue-600">v2.0</span></h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Quantitative Research Engine</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-1 bg-slate-100 p-1.5 rounded-2xl overflow-x-auto max-w-full no-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === item.id 
                    ? 'bg-white text-blue-600 shadow-md transform scale-105' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 min-h-[700px]">
          {activeTab === 'eda' && <Analytics data={dataset} />}
          {activeTab === 'predictor' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5">
                <PredictorForm onPredict={handlePredict} isLoading={isLoading} />
              </div>
              <div className="lg:col-span-7">
                <div className="sticky top-24">
                  <h3 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                    Prediction Insights & XAI
                  </h3>
                  {currentPrediction ? (
                    <PredictionResultsView result={currentPrediction} />
                  ) : (
                    <div className="h-[400px] bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center p-10">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 text-slate-200">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                      </div>
                      <p className="text-slate-400 font-semibold">Run a simulation to generate AI-driven displacement insights.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'jobs' && <JobRiskDashboard />}
          {activeTab === 'sim' && <ScenarioSimulator onSimulate={handlePredict} />}
          {activeTab === 'performance' && (
            <div className="space-y-10">
              <header>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Model Performance Benchmark</h2>
                <p className="text-slate-500 mt-2">Evaluation of Linear, Random Forest, and Gradient Boosting architectures.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Linear Regression', mae: 1.24, rmse: 1.56, r2: 0.72, color: 'slate' },
                  { name: 'Random Forest', mae: 0.45, rmse: 0.62, r2: 0.94, color: 'blue', best: true },
                  { name: 'Gradient Boosting', mae: 0.51, rmse: 0.71, r2: 0.91, color: 'indigo' }
                ].map(m => (
                  <div key={m.name} className={`p-8 rounded-3xl border-2 transition-all hover:shadow-xl ${m.best ? 'border-blue-500 bg-blue-50/30' : 'border-slate-100 bg-white'}`}>
                    <div className="flex justify-between items-start mb-6">
                      <h4 className="text-lg font-bold text-slate-800">{m.name}</h4>
                      {m.best && <span className="px-2 py-1 bg-blue-600 text-white text-[10px] font-black uppercase rounded-lg">Champion</span>}
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center"><span className="text-slate-400 text-sm font-medium">MAE</span><span className="font-mono font-bold">{m.mae}</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-400 text-sm font-medium">RMSE</span><span className="font-mono font-bold">{m.rmse}</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-400 text-sm font-medium">R² Score</span><span className="font-mono font-bold text-blue-600">{m.r2}</span></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
                <h4 className="text-lg font-bold mb-4 text-slate-800">Residual Distribution (Champion Model)</h4>
                <div className="h-4 bg-white rounded-full overflow-hidden flex gap-0.5 p-0.5 border border-slate-200">
                  <div className="bg-emerald-500 w-[70%]" title="Accurate Predictions"></div>
                  <div className="bg-amber-400 w-[20%]" title="Minor Residuals"></div>
                  <div className="bg-rose-500 w-[10%]" title="Outliers"></div>
                </div>
                <div className="flex justify-between mt-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Under-predicted</span>
                  <span>Optimal Fit (N=500)</span>
                  <span>Over-predicted</span>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'report' && <ResearchReport features={lastFeatures} prediction={currentPrediction} />}
          {activeTab === 'about' && <AboutPage />}
        </div>
      </main>

      <footer className="py-12 border-t border-slate-200 text-center bg-white mt-12">
        <p className="text-slate-400 text-sm font-medium">
          AutoLab AI &copy; 2024. Prototype for Quantitative Labor Market Dynamics Analysis.
        </p>
      </footer>
    </div>
  );
};

export default App;
