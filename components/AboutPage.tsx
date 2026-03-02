
import React from 'react';
import { motion } from 'motion/react';
import { Info, BookOpen, Target, Users, Globe, Shield } from 'lucide-react';

const AboutPage: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-4xl mx-auto space-y-16 py-10"
    >
      {/* Hero Section */}
      <motion.section variants={item} className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl mb-4">
          <Info size={40} />
        </div>
        <h2 className="text-5xl font-black text-slate-900 tracking-tight">About AutoLab AI</h2>
        <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
          A quantitative research engine designed to decode the complex relationship between 
          artificial intelligence, automation, and the global labor market.
        </p>
      </motion.section>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div variants={item} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
            <Target size={24} />
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-4">Our Mission</h3>
          <p className="text-slate-500 leading-relaxed">
            To provide data-driven insights that help policymakers, educators, and professionals 
            navigate the transition toward an AI-integrated economy. We believe in augmentation 
            over displacement, focusing on how technology can enhance human potential.
          </p>
        </motion.div>

        <motion.div variants={item} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <Globe size={24} />
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-4">Global Impact</h3>
          <p className="text-slate-500 leading-relaxed">
            By analyzing sectoral vulnerabilities and digital adoption indices, AutoLab AI 
            identifies regional and industry-specific trends that shape the future of work 
            across the globe, from manufacturing hubs to creative centers.
          </p>
        </motion.div>
      </div>

      {/* Research Foundation */}
      <motion.section variants={item} className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <BookOpen size={200} />
        </div>
        <div className="relative z-10 space-y-6">
          <h3 className="text-3xl font-black">Research Foundation</h3>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
            AutoLab AI is built upon the quantitative framework established in the research paper: 
            <span className="text-white font-bold italic block mt-2">
              "AI-Driven Automation and Labor Market Dynamics: A Quantitative Analysis Using Predictive Modeling"
            </span>
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/10">
              <Shield size={16} className="text-blue-400" />
              <span className="text-sm font-bold">Peer Reviewed</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/10">
              <Users size={16} className="text-emerald-400" />
              <span className="text-sm font-bold">Collaborative Data</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Core Principles */}
      <motion.section variants={item} className="space-y-10">
        <h3 className="text-3xl font-black text-center text-slate-900">Core Principles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title: "Transparency", desc: "Open-source modeling and explainable AI (XAI) insights.", color: "bg-blue-50 text-blue-600" },
            { title: "Accuracy", desc: "Validated against historical labor data and economic trends.", color: "bg-emerald-50 text-emerald-600" },
            { title: "Human-Centric", desc: "Focusing on skill development and career resilience.", color: "bg-amber-50 text-amber-600" }
          ].map((p, i) => (
            <div key={i} className="text-center space-y-4 p-6">
              <div className={`w-16 h-16 ${p.color} rounded-3xl flex items-center justify-center mx-auto mb-2 font-black text-xl`}>
                0{i + 1}
              </div>
              <h4 className="text-xl font-black text-slate-800">{p.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Footer Note */}
      <motion.section variants={item} className="text-center pt-10 border-t border-slate-100">
        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
          Version 2.0.0 • Developed for Quantitative Labor Research
        </p>
      </motion.section>
    </motion.div>
  );
};

export default AboutPage;
