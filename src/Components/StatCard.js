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
            <div className="stats-card__activity-type">
                <p className="stats-card__day">Quality</p>
                <p className="text">{quality}</p>
            </div>
            <div className="stats-card__difficulty">
                <p className="stats-card__day">Dreams</p>
                <p className="stats-card__text">{difficulty}</p>
            </div>
        </div>
    );
};

export default StatCard;

// <div className="stats-card__difficulty">
//     <p className="stats-card__day">Notes</p>
//     <p className="stats-card__text">{notes}</p>
// </div>;
