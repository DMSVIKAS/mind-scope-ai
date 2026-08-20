import "../styles/about.css";

function About() {
    const timeline = [
        {
            date: "02 May 2026",
            title: "Project Idea",
            desc: "Planned an AI-powered mental health prediction platform using NLP and Machine Learning."
        },
        {
            date: "08 May 2026",
            title: "Dataset Collection",
            desc: "Collected and cleaned over 50,000+ mental health text records."
        },
        {
            date: "15 May 2026",
            title: "Data Preprocessing",
            desc: "Performed text cleaning, TF-IDF vectorization and feature engineering."
        },
        {
            date: "24 May 2026",
            title: "ML Model Training",
            desc: "Successfully trained Logistic Regression, Random Forest, SVM, XGBoost and LightGBM."
        },
        {
            date: "01 June 2026",
            title: "Backend Development",
            desc: "Developed FastAPI backend for prediction and analytics APIs."
        },
        {
            date: "12 June 2026",
            title: "Dashboard UI",
            desc: "Built a responsive React dashboard with interactive analytics."
        },
        {
            date: "22 June 2026",
            title: "Analytics Module",
            desc: "Added prediction history, confidence analysis and model usage statistics."
        },
        {
            date: "03 July 2026",
            title: "Batch Prediction",
            desc: "Implemented CSV upload support for bulk predictions."
        },
        {
            date: "14 July 2026",
            title: "Model Comparison",
            desc: "Integrated multiple machine learning models for comparison."
        },
        {
            date: "20 July 2026",
            title: "MindScope AI v1.0",
            desc: "Completed the first stable release of the platform."
        }
    ];

    return (
        <div className="about-page">

            <section className="hero">
                <h1>About MindScope AI</h1>
                <p>
                    MindScope AI is an AI-powered Mental Health Analytics Platform
                    designed to identify mental health conditions using Natural
                    Language Processing and Machine Learning. The platform provides
                    intelligent predictions, confidence scores, analytics dashboards,
                    and model comparison tools to demonstrate the application of AI
                    in healthcare analytics.
                </p>
            </section>

            <section className="about-card">
                <h2>🎯 Project Objectives</h2>

                <ul>
                    <li>Develop an intelligent mental health prediction system.</li>
                    <li>Compare multiple machine learning algorithms.</li>
                    <li>Provide real-time predictions with confidence scores.</li>
                    <li>Support single text and CSV batch predictions.</li>
                    <li>Visualize insights using interactive dashboards.</li>
                    <li>Demonstrate AI applications in healthcare.</li>
                </ul>
            </section>

            <section className="about-card">
                <h2>🤖 Machine Learning Models</h2>

                <div className="models-grid">

                    <div className="model-card">
                        <h3>Logistic Regression</h3>
                        <p>Fast baseline model with excellent interpretability.</p>
                    </div>

                    <div className="model-card">
                        <h3>Random Forest</h3>
                        <p>Ensemble model providing robust and stable predictions.</p>
                    </div>

                    <div className="model-card">
                        <h3>Support Vector Machine</h3>
                        <p>Effective classifier for high-dimensional text data.</p>
                    </div>

                    <div className="model-card">
                        <h3>XGBoost</h3>
                        <p>High-performance gradient boosting algorithm.</p>
                    </div>

                    <div className="model-card">
                        <h3>LightGBM</h3>
                        <p>Efficient boosting framework optimized for speed.</p>
                    </div>

                </div>
            </section>

            <section className="about-card">

                <h2>⚙️ Technologies Used</h2>

                <div className="tech-grid">

                    <span>React</span>
                    <span>Vite</span>
                    <span>FastAPI</span>
                    <span>Python</span>
                    <span>Scikit-Learn</span>
                    <span>TF-IDF</span>
                    <span>ApexCharts</span>
                    <span>Tailwind CSS</span>

                </div>

            </section>

            <section className="about-card">

                <h2>✨ Key Features</h2>

                <div className="features">

                    <span>✔ AI Prediction</span>
                    <span>✔ 5 ML Models</span>
                    <span>✔ Confidence Scores</span>
                    <span>✔ Analytics Dashboard</span>
                    <span>✔ Prediction History</span>
                    <span>✔ Batch CSV Upload</span>
                    <span>✔ Model Comparison</span>
                    <span>✔ Interactive Charts</span>

                </div>

            </section>

            <section className="about-card">

                <h2>📅 Project Timeline</h2>

                <div className="timeline">

                    {timeline.map((item, index) => (

                        <div className="timeline-item" key={index}>

                            <div className="timeline-dot"></div>

                            <div className="timeline-content">

                                <small>{item.date}</small>

                                <h3>{item.title}</h3>

                                <p>{item.desc}</p>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

            <section className="about-card">

                <h2>🚀 Future Enhancements</h2>

                <ul>
                    <li>Deep Learning (BERT/RoBERTa)</li>
                    <li>Explainable AI</li>
                    <li>User Authentication</li>
                    <li>Doctor Dashboard</li>
                    <li>Cloud Deployment</li>
                    <li>Mobile Application</li>
                    <li>PDF Report Generation</li>
                    <li>Multilingual Prediction</li>
                </ul>

            </section>

        </div>
    );
}

export default About;