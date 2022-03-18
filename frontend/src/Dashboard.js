import { useState, useEffect } from "react";
import Form from "./Form";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
  const history = useHistory();
  // LIST
  const [list, setList] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [zone, setZone] = useState("");
  const [street, setStreet] = useState("");

  const props = {
    name,
    setName,
    age,
    setAge,
    zone,
    setZone,
    street,
    setStreet,
  };

  const [error, setError] = useState(false);

  //FOR EDIT FORM
  const [modal, setModal] = useState(false);
  const [theList, setTheList] = useState();

  const [forName, setForName] = useState("");
  const [forAge, setForAge] = useState();
  const [forZone, setForZone] = useState();
  const [forStreet, setForStreet] = useState("");

  const openModal = (lista) => {
    setModal(true);
    setTheList(lista);
    setForName(lista.name);
    setForAge(lista.age);
    setForZone(lista.address.zone);
    setForStreet(lista.address.street);
  };
  const closeModal = () => {
    setModal(false);
  };

  // GET
  useEffect(() => {
    // LOGIN AUTO
    const token = localStorage.getItem("token");
    if (token) {
      // FETCH DATA ONLY IF LOGININ
      fetch("http://localhost:8000/api/data")
        .then((res) => res.json())
        .then((data) => {
          setList(data);
        })
        .catch(() => {
          setError(true);
        });
    } else {
      localStorage.removeItem("token");
      history.replace("/login");
    }
  }, []);

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    history.replace("/login");
  };

  // DELETE
  const del = (lista) => {
    fetch("http://localhost:8000/api/data/" + lista._id, {
      method: "DELETE",
    })
      .then(() => {
        console.log("deleted");
        setList(
          list.filter((val) => {
            return val._id !== lista._id;
          })
        );
      })
      .catch((e) => console.log(e));
  };

  // UPDATE
  const updateMe = (lista) => {
    fetch("http://localhost:8000/api/data/" + lista._id, {
      method: "PUT",
      body: JSON.stringify({
        name: forName,
        age: forAge,
        address: {
          zone: forZone,
          street: forStreet,
        },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  };

  return (
    <div className="container">
      <button onClick={() => logout()}>logout</button>
      <Form {...props} />
      {error === true ? (
        // SERVER 505
        <div>
          <h1>505 Internal Server Error</h1>
        </div>
      ) : // LOADING
      list.length === 0 ? (
        <h1>loading</h1>
      ) : (
        // DATA
        list.map((lista, index) => {
          return (
            <div key={index} className="list">
              <li onClick={() => openModal(lista)}>{lista.name}</li>
              <button onClick={() => del(lista)}>delete</button>
            </div>
          );
        })
      )}

      {/* MODAL  */}
      {modal && (
        <div className="modal">
          <h1>Edit: {theList.name}</h1>
          <button onClick={closeModal}>close</button>
          {/* FORM FOR UPDATE */}
          <label>name:</label>
          <input value={forName} onChange={(e) => setForName(e.target.value)} />
          <input value={forAge} onChange={(e) => setForAge(e.target.value)} />
          <input value={forZone} onChange={(e) => setForZone(e.target.value)} />
          <input
            value={forStreet}
            onChange={(e) => setForStreet(e.target.value)}
          />
          <button onClick={() => updateMe(theList)}>update</button>
        </div>
      )}
    </div>
  );
}
