
import { GoogleGenAI, Type } from "@google/genai";
import { PredictionFeatures } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getEmploymentInsight = async (features: PredictionFeatures) => {
  const prompt = `
    Based on the research paper "AI-Driven Automation and Labor Market Dynamics: A Quantitative Analysis Using Predictive Modeling", 
    analyze this scenario:
    
    Sector: ${features.sector}
    Robot Density: ${features.robot_density}
    AI Spending Index: ${features.ai_spending_index}/100
    Digital Adoption: ${features.digital_adoption_index}/100
    Routine Task Share: ${features.routine_task_share}%
    Average Wage: $${features.avg_wage}
    
    Provide a comprehensive analysis including:
    1. Numerical estimate for Employment Change % (prediction)
    2. Top 3 influential features (top_features)
    3. 2-3 sentence explanation of displacement vs. augmentation (analysis)
    4. Automation Risk Detection for Routine, Clerical, and Technical jobs (automation_risks)
    5. Future Job Demand Prediction for Tech, Creative, and Manual Routine jobs (job_demand)
    6. Salary Impact Analysis for High, Medium, and Low Skill levels (salary_impact)
    7. AI Readiness Score (0-100) based on digital adoption and spending (ai_readiness_score)
    8. Career Stability Index identifying low and high stability roles (career_stability)
    9. 3-5 Skill Recommendations for the future (skill_recommendations)
    10. Overall Future Career Outlook: Positive, Negative, or Neutral (future_outlook)
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            prediction: { type: Type.NUMBER },
            top_features: { type: Type.ARRAY, items: { type: Type.STRING } },
            analysis: { type: Type.STRING },
            automation_risks: {
              type: Type.OBJECT,
              properties: {
                routine: { type: Type.STRING },
                clerical: { type: Type.STRING },
                technical: { type: Type.STRING }
              },
              required: ["routine", "clerical", "technical"]
            },
            job_demand: {
              type: Type.OBJECT,
              properties: {
                tech: { type: Type.STRING },
                creative: { type: Type.STRING },
                manual: { type: Type.STRING }
              },
              required: ["tech", "creative", "manual"]
            },
            salary_impact: {
              type: Type.OBJECT,
              properties: {
                high_skill: { type: Type.STRING },
                medium_skill: { type: Type.STRING },
                low_skill: { type: Type.STRING }
              },
              required: ["high_skill", "medium_skill", "low_skill"]
            },
            ai_readiness_score: { type: Type.NUMBER },
            career_stability: {
              type: Type.OBJECT,
              properties: {
                low_stability_roles: { type: Type.STRING },
                high_stability_roles: { type: Type.STRING }
              },
              required: ["low_stability_roles", "high_stability_roles"]
            },
            skill_recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
            future_outlook: { type: Type.STRING, enum: ["Positive", "Negative", "Neutral"] }
          },
          required: [
            "prediction", "top_features", "analysis", "automation_risks", 
            "job_demand", "salary_impact", "ai_readiness_score", 
            "career_stability", "skill_recommendations", "future_outlook"
          ]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return { 
      prediction: -1.2, 
      top_features: ["Routine Task Share", "Robot Density"], 
      analysis: "Baseline statistical fallback due to API error.",
      automation_risks: { routine: "High Risk", clerical: "Moderate Risk", technical: "Low Risk" },
      job_demand: { tech: "High Growth", creative: "Stable", manual: "Decline" },
      salary_impact: { high_skill: "Increase", medium_skill: "Stable", low_skill: "Decrease" },
      ai_readiness_score: 50,
      career_stability: { low_stability_roles: "Routine Clerical", high_stability_roles: "Specialized Technical" },
      skill_recommendations: ["Data Literacy", "AI Tools", "Problem Solving"],
      future_outlook: "Neutral"
    };
  }
};

export const generateFullReport = async (data: any) => {
  const prompt = `Generate a professional Research Summary Report based on these metrics: ${JSON.stringify(data)}. 
  Include sections: Executive Summary, Sectoral Vulnerability, AI Augmentation Potential, and Policy Recommendations. 
  The tone should be academic yet actionable.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt
    });
    return response.text;
  } catch (error) {
    return "Error generating full report. Please check API availability.";
  }
};
