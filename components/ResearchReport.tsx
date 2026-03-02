
import React, { useState, useEffect } from 'react';
import { generateFullReport } from '../services/geminiService';
import { PredictionFeatures } from '../types';

interface ResearchReportProps {
  features: PredictionFeatures | null;
  prediction: any | null;
}

const ResearchReport: React.FC<ResearchReportProps> = ({ features, prediction }) => {
  const [reportText, setReportText] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (features && prediction) {
      setLoading(true);
      generateFullReport({ features, prediction }).then(txt => {
        setReportText(txt);
        setLoading(false);
      });
    }
  }, [features, prediction]);

  const downloadReport = () => {
    const blob = new Blob([reportText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `autolab-research-report-${features?.sector}.md`;
    a.click();
  };

  if (!features) {
    return (
      <div className="h-[500px] flex flex-col items-center justify-center text-center p-12">
        <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-6 text-slate-300">
           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
        </div>
        <h3 className="text-2xl font-black text-slate-800">No Research Data Compiled</h3>
        <p className="text-slate-500 mt-2 max-w-sm">Please generate a prediction in the Predictor tab to initialize the research report generator.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Research Summary Report</h2>
          <p className="text-slate-500 mt-1 uppercase text-[10px] font-black tracking-widest">Synthesis of Simulation ID: {Math.random().toString(36).substr(2, 9)}</p>
        </div>
        <button 
          onClick={downloadReport}
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Export Report (.md)
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] p-12 shadow-inner overflow-y-auto max-h-[800px] prose prose-slate max-w-none">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
             <p className="text-slate-400 font-bold text-sm">LLM Synthesis in Progress...</p>
          </div>
        ) : (
          <div className="whitespace-pre-wrap font-sans leading-relaxed text-slate-700 text-lg">
            {reportText || "Click Predict to generate research content."}
          </div>
        )}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-10">
        <h4 className="text-lg font-bold mb-4 text-slate-800">Final Research Verdict</h4>
        <div className="flex items-start gap-4">
           <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
           </div>
           <p className="text-slate-600 text-sm leading-relaxed italic">
             "Automation reshapes rather than replaces employment. While routine-heavy roles face immediate displacement risks, the synthesis of high AI spending and digital adoption index highlights a significant multiplier effect on technical and creative roles, necessitated by the management of complex AI-human workflows."
           </p>
        </div>
      </div>
    </div>
  );
};

export default ResearchReport;
