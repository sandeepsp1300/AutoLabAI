
import React from 'react';
import { PredictionResult } from '../types';
import { motion } from 'motion/react';
import { 
  Zap, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  Lightbulb, 
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from 'lucide-react';

interface PredictionResultsViewProps {
  result: PredictionResult;
}

const PredictionResultsView: React.FC<PredictionResultsViewProps> = ({ result }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* 1. Impact Projection & Analysis */}
      <motion.div variants={item} className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <Zap size={160} />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm font-black uppercase tracking-[0.2em] mb-2">Employment Impact Projection</p>
              <h4 className={`text-7xl font-black ${result.prediction < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {result.prediction > 0 ? '+' : ''}{result.prediction}%
              </h4>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex flex-col items-end">
              <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mb-1">Future Outlook</p>
              <div className="flex items-center gap-2">
                {result.future_outlook === 'Positive' && <ArrowUpRight className="text-emerald-400" size={20} />}
                {result.future_outlook === 'Negative' && <ArrowDownRight className="text-rose-400" size={20} />}
                {result.future_outlook === 'Neutral' && <Minus className="text-amber-400" size={20} />}
                <p className={`text-lg font-black ${
                  result.future_outlook === 'Positive' ? 'text-emerald-400' : 
                  result.future_outlook === 'Negative' ? 'text-rose-400' : 'text-amber-400'
                }`}>
                  {result.future_outlook}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-700/50">
            <p className="text-slate-300 leading-relaxed italic text-xl font-medium">"{result.analysis}"</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 2. Automation Risk Detection */}
        <motion.div variants={item} className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow">
          <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <AlertTriangle size={16} className="text-rose-500" />
            Automation Risk Detection
          </h5>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-sm font-bold text-slate-600">Routine Jobs</span>
              <span className={`px-3 py-1 rounded-lg text-xs font-black ${
                result.automation_risks.routine.toLowerCase().includes('high') ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-700'
              }`}>{result.automation_risks.routine}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-sm font-bold text-slate-600">Clerical Jobs</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-black">{result.automation_risks.clerical}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-sm font-bold text-slate-600">Technical Jobs</span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-black">{result.automation_risks.technical}</span>
            </div>
          </div>
        </motion.div>

        {/* 3. Future Job Demand */}
        <motion.div variants={item} className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow">
          <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <TrendingUp size={16} className="text-blue-500" />
            Future Job Demand Prediction
          </h5>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-sm font-bold text-slate-600">Tech Jobs</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-black">{result.job_demand.tech}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-sm font-bold text-slate-600">Creative Jobs</span>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-black">{result.job_demand.creative}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-sm font-bold text-slate-600">Manual Routine</span>
              <span className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg text-xs font-black">{result.job_demand.manual}</span>
            </div>
          </div>
        </motion.div>

        {/* 4. Salary Impact Analysis */}
        <motion.div variants={item} className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow">
          <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <DollarSign size={16} className="text-emerald-500" />
            Salary Impact Analysis
          </h5>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-sm font-bold text-slate-600">High Skill</span>
              <span className="text-emerald-600 font-black text-sm">{result.salary_impact.high_skill}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-sm font-bold text-slate-600">Medium Skill</span>
              <span className="text-slate-600 font-black text-sm">{result.salary_impact.medium_skill}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <span className="text-sm font-bold text-slate-600">Low Skill</span>
              <span className="text-rose-600 font-black text-sm">{result.salary_impact.low_skill}</span>
            </div>
          </div>
        </motion.div>

        {/* 5. AI Readiness & Stability */}
        <motion.div variants={item} className="bg-white border-2 border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-6">
            <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={16} className="text-amber-500" />
              AI Readiness Score
            </h5>
            <span className="text-2xl font-black text-slate-900">{result.ai_readiness_score}%</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-8">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${result.ai_readiness_score}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500" 
            ></motion.div>
          </div>
          
          <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Career Stability Index</h5>
          <div className="space-y-3">
            <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">High Stability Roles</p>
              <p className="text-sm font-bold text-emerald-700">{result.career_stability.high_stability_roles}</p>
            </div>
            <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Low Stability Roles</p>
              <p className="text-sm font-bold text-rose-700">{result.career_stability.low_stability_roles}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 6. Skill Recommendations */}
      <motion.div variants={item} className="bg-blue-50 border-2 border-blue-100 rounded-[2.5rem] p-10">
        <h5 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <Lightbulb size={18} className="text-blue-500" />
          Skill Recommendation System
        </h5>
        <div className="flex flex-wrap gap-3">
          {result.skill_recommendations.map((skill, idx) => (
            <motion.span 
              key={idx} 
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-white text-blue-700 rounded-2xl text-sm font-black shadow-sm border border-blue-100 cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* 7. XAI Influencers */}
      <motion.div variants={item} className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200">
        <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
          <BarChart3 size={16} />
          Key Model Influencers (XAI)
        </h5>
        <div className="flex flex-wrap gap-2">
          {result.top_features.map((f) => (
            <span key={f} className="px-3 py-1.5 bg-slate-200 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
              {f}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PredictionResultsView;
