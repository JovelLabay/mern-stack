import { useContext } from 'react';
import './App.css';
import { Context } from './Context';
import {Lala} from "./Sample"

function App() {
  const {count, setCount} = useContext(Context)
  return (
    <div className="App">
        <button onClick={() => setCount(count + 1)}>press | mounted</button>
      <h1>{count}</h1>    
                      <Lala count={count} setCount={setCount} />

    </div>
  );
}

export default App;
