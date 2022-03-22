import React from "react";

export default function Planets({ data }) {
  return (
    <div>
      {data.results.map(function (planets, index) {
        return (
          <h1 key={index}>
            {index}
            {": "}
            {planets.name}
          </h1>
        );
      })}
    </div>
  );
}
