import { useContext, useEffect, useState } from "react";
import { Context } from "./Context";
import { Lala } from "./Sample";

function App() {
  const { count, setCount } = useContext(Context);
  const [theTime, setTime] = useState();

  // setInterval(() => {
  //   const myTime = new Date();
  //   setTime(myTime.toLocaleTimeString());
  // }, 1000);
  return (
    <div className="App">
      <p>son</p>
      <p>{theTime}</p>
      <button onClick={() => setCount(count + 1)}>press | mounted</button>
      <h1>{count}</h1>
      <Lala count={count} setCount={setCount} />
    </div>
  );
}

export default App;
