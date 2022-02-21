import { useState, useEffect, useContext } from "react";
import App from "./App";
import { Context } from "./Context";

import "./App.css";

export default function Sample() {
  const [count, setCount] = useState(0);
  const [val, setVal] = useState("");

  return (
    <div>
      <p>parent</p>
      <Context.Provider value={{ count, setCount }}>
        <button onClick={() => setCount(count + 1)}>press | mounted</button>
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
  const [resme, setResme] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [zone, setZone] = useState("");
  const [street, setStreet] = useState("");

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((res) => setResme(res))
      .catch((err) => console.log(err));
  }, []);

  const postMe = (e) => {
    e.preventDefault();
    setName("");
    setAge("");
    setZone("");
    setStreet("");

    fetch("/api/data/create", {
      method: "POST",
      body: JSON.stringify({
        name,
        age,
        address: {
          zone,
          street,
        },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => console.log("ok"))
      .catch((err) => {
        throw err.message;
      });
  };

  function wak(data) {
    fetch("/api/data/" + data._id, {
      method: "DELETE",
    }).then(() => console.log("deleted"));

    setResme(
      resme.filter((val) => {
        return val._id !== data._id;
      })
    );
  }

  return (
    <div>
      <p>child</p>
      <h1>{props.count}</h1>
      <button onClick={() => props.setCount(props.count + 1)}>
        press | mounted
      </button>
      <div className="other">
        <form onSubmit={postMe}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            placeholder="zone"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
          />
          <input
            placeholder="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <input type="submit" title="post" />
        </form>

        {resme.map((data, index) => {
          return (
            <li key={index}>
              <button onClick={() => wak(data)}>
                {index + " "}
                {data.name}
              </button>
            </li>
          );
        })}
      </div>
    </div>
  );
}
