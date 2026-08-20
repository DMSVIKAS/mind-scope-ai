import "./MetricCard.css";

function MetricCard({ title, value, subtitle, icon, color }) {

    return (

        <div className="metric-card">

            <div className="metric-top">

                <div
                    className="metric-icon"
                    style={{
                        background: color
                    }}
                >
                    {icon}
                </div>

            </div>

            <h3>{title}</h3>

            <h1>{value}</h1>

            <p>{subtitle}</p>

        </div>

    )

}

export default MetricCard;