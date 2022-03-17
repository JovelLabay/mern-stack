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
  const [modal, setModal] = useState(false)

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
  function update(lista) {
    // fetch("http://localhost:8000/api/data/" + lista.name, {
    //   method: "PUT",
    // })
    //   .then(() => console.log("update"))
    //   .catch((e) => console.log(e));

    alert(lista._id)
  }

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

            <div key={index} className="list" onClick={() => {
              update(lista)
            }}>
              <li>{lista.name}</li>
              <button onClick={() => del(lista)}>delete</button>
            </div>

          );
        })
      )}

      {/*  MODAL  */}
      {/*{modal && <div className="modal">*/}
      {/*  <h1>Edit: {}</h1>*/}
      {/*  <button onClick={() => setModal(false)}>close</button>*/}
      {/*  <h1 >hello</h1>*/}
      {/*</div> }*/}

    </div>
  );
}
