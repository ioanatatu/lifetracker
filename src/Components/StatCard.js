import React from "react";

const StatCard = ({ title, amount, day, quality, difficulty, notes }) => {
    return (
        <div className="stats-card">
            <div className="stats-card__title">
                {amount} hrs<span className="color-accent">_</span>
                {title}
            </div>
            <div className="stats-card__duration"></div>

            <div className="stats-card__day">{day}</div>

            <div className="stats-card__details">
                <p>
                    Quality:{" "}
                    <span className="stats-card__content">{quality}</span>
                </p>
            </div>

            <div className="stats-card__details">
                <p>
                    Dreams:{" "}
                    <span className="stats-card__content">{difficulty}</span>
                </p>
            </div>

            <div className="stats-card__details">
                <p>
                    Notes: <span className="stats-card__content">{notes}</span>
                </p>
            </div>
        </div>
    );
};

export default StatCard;
