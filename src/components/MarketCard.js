import React from "react";

export default function MarketCard({ market }) {
  return (
    <div style={{border: "1px solid #ccc", padding: 15, margin: 10}}>
      <h3>{market.title}</h3>
      <p>Probability: {market.probability}%</p>
      <p>Volume: ${market.volume}</p>
      <p>Trend: {market.trend}</p>
    </div>
  );
}