
import { Sector, AutomationData } from '../types';

export const generateSyntheticData = (rows: number = 500): AutomationData[] => {
  const data: AutomationData[] = [];
  const sectors = Object.values(Sector);

  for (let i = 0; i < rows; i++) {
    const sector = sectors[Math.floor(Math.random() * sectors.length)];
    
    // Base features
    const robot_density = Math.floor(Math.random() * 500);
    const ai_spending_index = Math.floor(Math.random() * 100);
    const digital_adoption_index = Math.floor(Math.random() * 100);
    const routine_task_share = Math.floor(Math.random() * 100);
    const avg_wage = 35000 + Math.random() * 100000;

    // Target Logic: Employment Change %
    // High Routine Share + High Robots = Negative Impact
    // High AI Spending + High Digital Adoption = Efficiency gains (can be positive or negative)
    let change = 0;
    
    // Sector specific coefficients
    const sectorCoef: Record<string, number> = {
      [Sector.Manufacturing]: -0.5,
      [Sector.Logistics]: -0.4,
      [Sector.Retail]: -0.2,
      [Sector.Finance]: 0.1,
      [Sector.Healthcare]: 0.3
    };

    change += sectorCoef[sector] * 2;
    change -= (routine_task_share / 10) * 0.8;
    change -= (robot_density / 100) * 1.5;
    change += (ai_spending_index / 20) * 1.2;
    change += (digital_adoption_index / 25) * 0.5;
    
    // Noise
    change += (Math.random() - 0.5) * 5;

    data.push({
      sector,
      robot_density,
      ai_spending_index,
      digital_adoption_index,
      routine_task_share,
      avg_wage: Math.round(avg_wage),
      employment_change_percent: parseFloat(change.toFixed(2))
    });
  }
  return data;
};

export const convertToCSV = (data: AutomationData[]): string => {
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(obj => Object.values(obj).join(',')).join('\n');
  return `${headers}\n${rows}`;
};
