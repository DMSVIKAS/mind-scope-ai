# 🧠 MindScope AI

<p align="center">
  <img src="https://raw.githubusercontent.com/DMSVIKAS/mind-scope-ai/main/mental-health-ai/frontend/src/assets/dashboard-main.png" width="100%" alt="MindScope AI Banner"/>
</p>

<p align="center">
  <b>AI-Powered Mental Health Analytics Platform</b><br>
  A full-stack AI application that analyzes mental health-related text using multiple machine learning models and presents insights through a modern analytics dashboard.
</p>

<p align="center">
  <a href="https://dmsvikas.github.io/portfolio3/"><img src="https://img.shields.io/badge/Portfolio-Live-7C3AED?style=for-the-badge"/></a>
  <img src="https://img.shields.io/badge/React-Vite-111827?style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/badge/FastAPI-Backend-111827?style=for-the-badge&logo=fastapi"/>
  <img src="https://img.shields.io/badge/MongoDB-Database-111827?style=for-the-badge&logo=mongodb"/>
</p>

---

# ✨ Overview

MindScope AI combines **FastAPI**, **React**, and **Machine Learning** to deliver real-time mental health sentiment analysis.

The platform supports multiple trained models, interactive analytics, prediction history, confidence visualization, and model benchmarking inside a premium dark-themed interface.

---

# 🚀 Features

<table>
<tr>
<td width="50%">

### 🧠 AI Prediction

- Text sentiment analysis
- TXT file upload
- Confidence scoring
- Risk assessment

</td>
<td width="50%">

### 📊 Analytics

- Live dashboard
- Confidence trends
- Disorder distribution
- Response metrics

</td>
</tr>

<tr>
<td width="50%">

### ⚖️ Model Comparison

- XGBoost
- Random Forest
- Logistic Regression
- SVM
- LightGBM

</td>
<td width="50%">

### 📜 History

- Search predictions
- Filters
- CSV export
- Detailed insights

</td>
</tr>
</table>

---

# 🖥 Dashboard

The landing dashboard gives an instant overview of prediction status, confidence score, wellness metrics, probability distribution, and emotional breakdown.

<p align="center">
  <img src="https://raw.githubusercontent.com/DMSVIKAS/mind-scope-ai/main/mental-health-ai/frontend/src/assets/dashboard-main.png" width="100%" alt="Dashboard">
</p>

### Dashboard Highlights

- Prediction Card
- Confidence Score
- Risk Indicator
- Accuracy Metrics
- Wellness Score

---

## Probability Distribution & Emotion Breakdown

<p align="center">
  <img src="https://raw.githubusercontent.com/DMSVIKAS/mind-scope-ai/main/mental-health-ai/frontend/src/assets/dashboard-scroll-1.png" width="100%" alt="Probability Distribution">
</p>

---

## Analytics Explorer

<p align="center">
  <img src="https://raw.githubusercontent.com/DMSVIKAS/mind-scope-ai/main/mental-health-ai/frontend/src/assets/dashboard-scroll-2.png" width="100%" alt="Analytics Explorer">
</p>

---

# 🧠 AI Sentiment Prediction

Users can enter text manually or upload a `.txt` document for sentiment analysis.

<p align="center">
  <img src="https://raw.githubusercontent.com/DMSVIKAS/mind-scope-ai/main/mental-health-ai/frontend/src/assets/predict-page.png" width="100%" alt="Prediction Page">
</p>

### Supported Input

- Manual Text
- TXT Upload
- Drag & Drop
- Model Selection

---

# 📈 Analytics Dashboard

The analytics page provides a complete overview of prediction performance.

<p align="center">
  <img src="https://raw.githubusercontent.com/DMSVIKAS/mind-scope-ai/main/mental-health-ai/frontend/src/assets/analytics-top.png" width="100%" alt="Analytics Dashboard">
</p>

### Live Metrics

- Total Predictions
- Today's Predictions
- Average Confidence
- Response Time
- Best Performing Model

---

## Prediction Timeline & AI Health

<p align="center">
  <img src="https://raw.githubusercontent.com/DMSVIKAS/mind-scope-ai/main/mental-health-ai/frontend/src/assets/analytics-middle.png" width="100%" alt="Prediction Timeline">
</p>

---

## Confidence Distribution & Model Usage

<p align="center">
  <img src="https://raw.githubusercontent.com/DMSVIKAS/mind-scope-ai/main/mental-health-ai/frontend/src/assets/analytics-bottom.png" width="100%" alt="Confidence Distribution">
</p>

---

# ⚖️ Compare Models

Run the same input across every trained model and compare their outputs.

<p align="center">
  <img src="https://raw.githubusercontent.com/DMSVIKAS/mind-scope-ai/main/mental-health-ai/frontend/src/assets/compare-models.png" width="100%" alt="Compare Models">
</p>

### Supported Models

| Model | Purpose |
|-------|---------|
| XGBoost | Primary classifier |
| Random Forest | Ensemble model |
| Logistic Regression | Baseline model |
| SVM | Margin classifier |
| LightGBM | Gradient boosting |

---

# 📜 Prediction History

Every prediction is automatically stored with timestamps, confidence scores, filters, and export functionality.

<p align="center">
  <img src="https://raw.githubusercontent.com/DMSVIKAS/mind-scope-ai/main/mental-health-ai/frontend/src/assets/history-top.png" width="100%" alt="Prediction History">
</p>

---

## Search, Filter & Export

<p align="center">
  <img src="https://raw.githubusercontent.com/DMSVIKAS/mind-scope-ai/main/mental-health-ai/frontend/src/assets/history-table.png" width="100%" alt="History Table">
</p>

### History Features

- Search
- Date Filter
- Model Filter
- Emotion Filter
- CSV Export
- Delete Records

---

# 🔍 Prediction Details

Each prediction opens a detailed modal with additional insights.

<p align="center">
  <img src="https://raw.githubusercontent.com/DMSVIKAS/mind-scope-ai/main/mental-health-ai/frontend/src/assets/prediction-detail-1.png" width="49%" alt="Prediction Detail 1">
  <img src="https://raw.githubusercontent.com/DMSVIKAS/mind-scope-ai/main/mental-health-ai/frontend/src/assets/prediction-detail-2.png" width="49%" alt="Prediction Detail 2">
</p>

### Includes

- Input Text
- Prediction Result
- Confidence
- Model Used
- Timestamp
- AI Recommendation

---

# 🏗 Architecture

<p align="center">
  <img src="https://raw.githubusercontent.com/DMSVIKAS/mind-scope-ai/main/mental-health-ai/frontend/src/assets/architecture.png" width="90%" alt="Architecture Diagram">
</p>

---

# 🛠 Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Backend | FastAPI |
| Database | MongoDB |
| ML | Scikit-learn |
| Charts | ApexCharts |
| Icons | React Icons |

---

# 📂 Project Structure

```text
mind-scope-ai
│
├── mental-health-ai
│   ├── frontend
│   │   ├── public
│   │   └── src
│   │       └── assets
│   └── backend
│
├── models trained
├── .gitattributes
└── README.md
```

---

# ⚡ Getting Started

## Clone

```bash
git clone https://github.com/DMSVIKAS/mind-scope-ai.git
cd mind-scope-ai
```

## Frontend

```bash
cd mental-health-ai/frontend
npm install
npm run dev
```

## Backend

```bash
cd mental-health-ai/backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

# 📊 Project Highlights

- Full-Stack AI Platform
- Real-Time Analytics
- Multi-Model Benchmarking
- Modern Dark UI
- Interactive Charts
- Prediction History
- CSV Export
- FastAPI + React Architecture

---

# 👨‍💻 Author

<p align="center">

### **Vikas (DMSVIKAS)**

Graduate Engineer • Full Stack Developer • AI Enthusiast

<a href="https://github.com/DMSVIKAS">GitHub</a> • <a href="https://dmsvikas.github.io/portfolio3/">Portfolio</a>

</p>

---

<p align="center">
Made with ❤️ by <b>DMSVIKAS</b>
</p>
