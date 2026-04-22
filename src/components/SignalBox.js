import React from "react";

export default function SignalBox({ probability, trend }) {
  let signal = "Neutral";

  if (probability > 60 && trend === "up") {
    signal = "Bullish";
  } else if (probability < 40 && trend === "down") {
    signal = "Bearish";
  }

  return (
    <div style={{marginTop: 10}}>
      <strong>Signal: {signal}</strong>
    </div>
  );
}