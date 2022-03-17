import React from "react";

export default function Form(props) {
  const { name, age, zone, street } = props;

  // POST
  const post = (e) => {
    e.preventDefault();
    props.setName("");
    props.setAge("");
    props.setZone("");
    props.setStreet("");

    fetch("http://localhost:8000/api/data/create", {
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
      .then(() => console.log("okay"))
      .catch((err) => {
        throw err.message;
      });
  };
  return (
    <div>
      <form onSubmit={post} className="form">
        <label>Fullname:</label>
        <input
          placeholder="Name"
          value={props.name}
          onChange={(e) => props.setName(e.target.value)}
        />
        <label>Age:</label>
        <input
          placeholder="age"
          value={props.age}
          onChange={(e) => props.setAge(e.target.value)}
        />
        <label>Zone:</label>
        <input
          placeholder="zone"
          value={props.zone}
          onChange={(e) => props.setZone(e.target.value)}
        />
        <label>street:</label>
        <input
          placeholder="street"
          value={props.street}
          onChange={(e) => props.setStreet(e.target.value)}
        />
        <input type="submit" className="submit" />
      </form>
    </div>
  );
}
