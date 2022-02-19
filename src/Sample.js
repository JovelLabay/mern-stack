import { useState, useEffect, useContext } from "react";

import App from "./App";
import { Context } from "./Context";

export default function Sample() {
  const [count, setCount] = useState(0);
  const [val, setVal] = useState("");

  async function go() {
    // fetch("http://localhost:8000/api/data/", {
    //   mode: "no-cors",
    //   method: "GET",
    // })
    //   .then((response) => response.json())
    //   .then((json) => console.log(json))
    //   .catch((e) => {
    //     throw e;
    //   });
    try {
      const data = await fetch("http://localhost:8000/api/data/", {
        mode: "no-cors",
      });
      const res = await data.json();
      console.log(res);
    } catch (error) {
      throw error;
    }
  }

  return (
    <div>
      <Context.Provider value={{ count, setCount }}>
        <button onClick={() => setCount(count + 1)}>press | mounted</button>
        <button onClick={go}>fetch</button>
        <input
          placeholder="hello"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <h1>{count}</h1>
        <h1>{val}</h1>
        <App />
      </Context.Provider>
    </div>
  );
}

export function Lala(props) {
  return (
    <div>
      <h1>{props.count}</h1>
      <button onClick={() => props.setCount(props.count + 1)}>
        press | mounted
      </button>
    </div>
  );
}
