
# AutoLab AI v2.0 – Mini Employment Impact Predictor

This project is a high-fidelity analytical prototype based on the research paper:
*"AI-Driven Automation and Labor Market Dynamics: A Quantitative Analysis Using Predictive Modeling"*

## 🚀 Final Stage Features
- **Deep EDA Module**: Sector-wise trends, AI adoption heatmaps, and correlation analysis.
- **Model Comparison Suite**: Comparative benchmarking of Linear, RF, and Gradient Boosting models.
- **Scenario Simulation Engine**: Test "Low" to "Extreme Shock" technological adoption paths.
- **Job Category Risk Dashboard**: Specialized analysis for Routine vs. Tech vs. Creative roles.
- **Explainable AI (XAI)**: Understand feature importance for every prediction.
- **Research Report Generator**: Automated PDF/Markdown summary of simulation findings.

## 🛠️ How to Run Project
1. **Initialize Data**:
   ```bash
   python generate_dataset.py
   ```
2. **Train Models**:
   ```bash
   python train_model.py
   ```
   *Note: This script automatically selects the champion model (Random Forest) based on lowest RMSE.*
3. **Launch Dashboard**:
   ```bash
   streamlit run app.py
   ```

## 📊 Example Test Inputs
- **Manufacturing** + High Routine (80%) + High Robots (400) -> **Displacement Outcome** (~ -4.5%)
- **Healthcare** + High AI Spending (90%) + Low Routine (10%) -> **Augmentation Outcome** (~ +5.2%)

## 📂 Project Structure
- `app.py`: Main Streamlit UI.
- `train_model.py`: Multi-model pipeline and serialization.
- `report_generator.py`: LLM-inspired research synthesis.
- `automation_dataset.csv`: Synthetic quantitative baseline.
