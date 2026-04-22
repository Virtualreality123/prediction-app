import React from "react";
import { markets } from "./data/mockData";
import MarketCard from "./components/MarketCard";
import SignalBox from "./components/SignalBox";

function App() {
  return (
    <div>
      <h1>Prediction Market Dashboard</h1>
      {markets.map((m) => (
        <div key={m.id}>
          <MarketCard market={m} />
          <SignalBox probability={m.probability} trend={m.trend} />
        </div>
      ))}
    </div>
  );
}

export default App;